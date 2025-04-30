import { prisma } from '@repo/db';
import type { IncomingMessage, OutgoingMessage, SignUpIncomingMessage } from '@repo/common/types';
import { randomUUIDv7, type ServerWebSocket, type WebSocket } from "bun";
import nacl_util from 'tweetnacl-util'
import nacl from 'tweetnacl';
import { PublicKey } from '@solana/web3.js';
interface GlobalObjType{
  [id:string]:(data:IncomingMessage)=>void
}

const globalObj:GlobalObjType={}

const availableValidators:{
  validatorId:string,
  socket:ServerWebSocket<unknown>,
  public_key:string
}[]=[]

const COST_PER_VALIDATION=100

Bun.serve({
  port:4000,
  fetch(req, server) {
    if (server.upgrade(req)) {
      return; 
    }
    return new Response("Upgrade failed", { status: 500 });
  },
  websocket:{

    // where we get the message - tbh
  async message(ws:ServerWebSocket<unknown>, message:string) {
    const data:IncomingMessage=JSON.parse(message);
    if(data.type=="signup"){
      const validate=await verifyMessage(
        `Signed Message for ${data.data.callbackId} ${data.data.public_key}`,
        data.data.public_key,
        data.data.ip
      );

      if(validate){
        await signUpHandler(ws,data.data)
      }
    }else if(data.type=="validate"){
      globalObj[data.data.callbackId]!(data);
      delete globalObj[data.data.callbackId];
    }
  },
  
    
    close(ws, code, message) {
      availableValidators.splice(availableValidators.findIndex(v=>v.socket==ws),1);
    }, // a socket is closed

    drain(ws) {}, // the socket is ready to receive more data // handlers
  }
});


const signUpHandler=async(ws:ServerWebSocket<unknown>,{public_key,signature,ip,callbackId}:SignUpIncomingMessage)=>{
  const validatorExist=await prisma.validator.findFirst({
    where:{
      public_key
    }
  });

  if(validatorExist){
    const data:OutgoingMessage={
      type:'signup',
      data:{
        callbackId,
        validatorId:validatorExist.id
      }
    }

    ws.send(JSON.stringify(data));

    availableValidators.push({validatorId:validatorExist.id,socket:ws,public_key})
    return;
  }else{
    const result=await prisma.validator.create({
      data:{
        public_key,
        ip,
        location:"N/A"
      }
    })

    ws.send(JSON.stringify({
      type:"signup",
      data:{
        callbackId,
        validatorId:result.id
      }
    }))

    availableValidators.push({validatorId:result.id,socket:ws,public_key})
  }
}

const verifyMessage=async(message:string,public_key:string,signature:string)=>{
  const messageBytes = nacl_util.decodeUTF8(message);
    const result = nacl.sign.detached.verify(
        messageBytes,
        new Uint8Array(JSON.parse(signature)),
        new PublicKey(public_key).toBytes(),
    );

    return result;

}



setInterval(async() => {

  try{
      const websites=await prisma.website.findMany({
        where:{
          disabled:false
        }
      });
      websites.forEach((website)=>{
        availableValidators.forEach((validator)=>{
          const callbackId=randomUUIDv7();
          validator.socket.send(JSON.stringify({
            type:"validate",
            data:{
              callbackId,
              url:website.url,
              websiteId:website.id,
            }
          
          }));


          globalObj[callbackId]=async(data:IncomingMessage)=>{
            if(data.type=="validate"){
              const {validatorId,signedMessage,latency,status,websiteId}=data.data

              const verified=await verifyMessage(
                `Replying to ${callbackId}`,
                validator.public_key,
                signedMessage
              )

              if(!verified){
                return
              }

              await prisma.$transaction(async(tx)=>{
                const result= await  tx.websiteTick.create({
                  data:{
                    websiteId,
                    validatorId,
                    status,
                    latency
                  }
                })
                if(!result){
                  throw new Error(`Error in setting the tick from the validatorId ${validatorId}`);
                }

                await tx.validator.update({
                  where:{
                    id:validatorId
                  },
                  data:{
                    pending_payouts: { increment: COST_PER_VALIDATION}
                  }
                })
                
              })

            }
          }
        })
      })
    

  }catch(err){
    console.log(err+"in sending the websites to validators")
  }
  
}, 30000);