import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
export const authMiddleware=(req:Request,res:Response,next:NextFunction)=>{
    try {

        console.log("inside middleware")

        const authHeaders=req.headers['authorization'];
        console.log(authHeaders+"yehhh hai apne header")
        if(!authHeaders){
            return res.status(306).json({
                message:"Not Authenticated user"
            })
        }

        const token = authHeaders?.split(" ")[1];
        console.log(token+"   yeh hai token")


        const JWT_PUBLIC_KEY=process.env.JWT_PUBLIC_KEY?? " "

        console.log(JWT_PUBLIC_KEY+"seccccc")
        // so this gives error because user doesn't exist on req type , so then you have explicitly declare types
        
        const decoded = jwt.verify(token!, JWT_PUBLIC_KEY, { algorithms: ['RS256'] }) as jwt.JwtPayload;
console.log("Token will expire at:", new Date(decoded.exp! * 1000).toISOString());

        if(!decoded || !decoded.sub){
            return res.json({
                message:"Error in Authentication"
            })
        }

        req.user=decoded.sub as string


        next()
        
    } catch (error) {
        console.log("Error in middleware "+ error);
    }
}

