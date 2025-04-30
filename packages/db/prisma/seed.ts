import { prisma } from "../src"


async function seed() {
    const user=await prisma.user.create({
        data:{
          email:"test@gmail.com"
        }
    })

   const website= await prisma.website.create({
        data:{
            url:"https://test.com",
            userId:user.id
        }
    })

    const validator=await prisma.validator.create({
        data:{
            public_key:"djdd",
            location:"Delhi",
            ip:"127.0.0.7",
        }
    })

    await prisma.websiteTick.create({
        data:{
            websiteId:website.id,
            status:"Good",
            createdAt:new Date(),
            latency:50,
            validatorId:validator.id

        }
    })

    await prisma.websiteTick.create({
        data:{
            websiteId:website.id,
            status:"Bad",
            createdAt:new Date(Date.now()-1000*60*20),
            latency:100,
            validatorId:validator.id

        }
    })

    await prisma.websiteTick.create({
        data:{
            websiteId:website.id,
            status:"Good",
            createdAt:new Date(Date.now()-1000*60*10),
            latency:70,
            validatorId:validator.id

        }
    })

    
}

seed()