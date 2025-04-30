 // this is first sent from validator to the hub , then in response the hub sends the SignUpOutgoing Message
 export type SignUpIncomingMessage={
    callbackId:string,
    public_key:string,
    ip:string,
    signature:string
}

 export type ValidateIncomingMessage={
    callbackId:string,
    signedMessage:string,
    latency:number,
    status:"Good"|"Bad",
    validatorId:string,
    websiteId:string
}

export type SignUpOutgoingMessage={
    callbackId:string,
    validatorId:string
}

// this is first sent from the hub to the validator , then validator respond with ValidatorIncomingMessage
export type ValidateOutgoingMessage={
    url:string,
    websiteId:string,
    callbackId:string
}


export type IncomingMessage={
    type:'signup',
    data:SignUpIncomingMessage
} | {
    type:"validate",
    data:ValidateIncomingMessage
}

export type OutgoingMessage={
    type:'validate',
    data:ValidateOutgoingMessage
} | {
    type:'signup',
    data:SignUpOutgoingMessage
}