
// declare module 'express' - both works but like in namespace you target the EXPRESS directly , but in module you target the request from express
declare namespace Express{
 interface Request{
    user?:string
 }
}