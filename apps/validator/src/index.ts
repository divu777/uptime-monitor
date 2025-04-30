import type { OutgoingMessage,  SignUpOutgoingMessage,  ValidateOutgoingMessage } from '@repo/common/types';
import { randomUUIDv7, type WebSocket } from "bun";
import nacl_util from 'tweetnacl-util'
import nacl from 'tweetnacl';
import { Keypair } from '@solana/web3.js';
interface GlobalObjType{
  [id:string]:(data:SignUpOutgoingMessage)=>void
}
const globalObj:GlobalObjType={}

let validatorId:string | null = null;



async function main() {

  const keypair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.PRIVATE_KEY!)));
  const ws = new WebSocket("ws://localhost:4000");

  ws.onmessage=async(event)=>{
    const data:OutgoingMessage=JSON.parse(event.data);

    if(data.type=="signup"){
      globalObj[data.data.callbackId]!(data.data)
      delete globalObj[data.data.callbackId]
    }
    else if(data.type=="validate"){
      await validateHandler(ws,data.data,keypair);
    }
  }

  ws.onopen=async(event)=>{
    const callbackId=randomUUIDv7();
    globalObj[callbackId]=(data:SignUpOutgoingMessage)=>{
      validatorId:data.validatorId
  }

  const signedMessage= await signMessage(`Signed message for ${callbackId}, ${keypair.publicKey}`,keypair);

  ws.send(JSON.stringify({
    type:"signup",
    data:{
      callbackId,
      signedMessage,
      ip:'124.5.3.4',
      public_key:keypair.publicKey
    }
  }))
}

}

async function validateHandler(ws:WebSocket,{url,websiteId,callbackId}:ValidateOutgoingMessage,keypair:Keypair) {

  const startTime = Date.now();
  const signature = await signMessage(`Replying to ${callbackId}`,keypair);
  try {
    const response=await fetch(url);

    const endTime= Date.now();
    const status=response.status==200?"Good":"Bad";
    const latency=endTime-startTime;

    const data={
      type:"validate",
      data:{
        callbackId,
        status,
        latency,
        websiteId,
        validatorId,
        signedMessage:signature
      }
    }
    ws.send(JSON.stringify(data))
    
  } catch (error) {
    ws.send(JSON.stringify({
      callbackId,
      status:"Bad",
      latency:1000,
      websiteId,
      validatorId,
      signedMessage:signature
    }))
    console.log(error+"in validating the url ")
  }
}


async function signMessage(message:string,keypair:Keypair){
  const messageBytes=nacl_util.decodeUTF8(message);
  const signature= nacl.sign.detached(messageBytes,keypair.secretKey);
  
  return JSON.stringify(Array.from(signature));
}


main()

setInterval(async () => {

}, 10000);


// TODO LIST FOR THIS WEB3 UPTIME 

