import e from 'express'
import { authMiddleware } from './middleware';
import {prisma} from '@repo/db'
import cors from 'cors'
const app =e();

app.use(cors({
    origin: 'http://localhost:3000',  // Your frontend URL here
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(e.json());


app.use(authMiddleware);



// to add new website to watch 
app.post("/api/v1/create-website",async(req,res)=>{
    try {
        const userId=req.user!
        const {url}=req.body
        const website=await prisma.website.create({
            data:{
                url,
                userId
            }
        })

        if(!website){
            return res.status(200).json({
                message:"Error in adding new website to DB",
                status:false
            })
        }
        return res.status(200).json({
            "message":"Added the New Website SuccessFully",
            status:true
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Error in creating new website endpoint"
        })
    }
})


// to get the status of the website
app.get("/api/v1/website/status",async(req,res)=>{
    const {websiteId}=req.query
    const userId=req.user!
    const websiteFound=await prisma.website.findUnique({
        where:{
            id:String(websiteId),
            userId,
            disabled:false
        },
        include:{
            website_ticks:true
        }
    })

    if(!websiteFound){
        return res.status(200).json({
            message:`Webiste with ${websiteId} not found`,
            status:false
        })
    }

    return res.status(200).json({
        message:"Wesbite status found",
        status:true,
        data:websiteFound.website_ticks
    })
})


app.get("/api/v1/get-websites",async(req,res)=>{

     const userId=req.user!

     const websites=await prisma.website.findMany({
        where:{
            userId,
            disabled:false
        },
        include:{
            website_ticks:true
        }
     })

     if(!websites || Array.isArray(websites) && websites.length==0){
        return res.status(200).json({
            message:`No Websites found for ${userId}`,
            status:false
        })
     }


     return res.status(200).json({
        message:"Found all the websites for the user",
        status:true,
        data:websites
     })

})

app.delete("/api/v1/website",async(req,res)=>{
 const userId = req.user
 const websiteId = req.body

    const result= await prisma.website.update({
        where:{
            userId,
            id:websiteId
        },
        data:{
            disabled:true
        }
    })

    if(!result){
        return res.status(200).json({
            message:"Could not delete the website",
            status:false
        })
    }

    return res.json({
        message:"Deleted the user website successfully",
        status:true
    })
})


const PORT= process.env.PORT ?? 5000

app.listen(PORT,()=>{
    console.log("app is running on port "+PORT);
})