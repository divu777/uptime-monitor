"use client"
import { config } from "@/config";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";

export enum WebsiteStatus {
    Good,
    Bad
  }

export type Website={
    id: string;
    url: string;
    website_ticks:{
        id:string,
        createdAt:string,
        status:'Good'|'Bad',
        latency:number
    }[]
}

export const useWebsites=()=>{
    const [websites,setWebsites]=useState<Website[]>([])
    const {getToken} = useAuth()

    const getWebsites = async () => {
        try {
            const token = await getToken();
            console.log("tpkk    "+ token)
            const result = await axios.get(`http://localhost:8080/api/v1/get-websites`, 
                {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                }
            }
        );
    
            setWebsites(result.data.data);
        } catch (error) {
            console.error("Failed to fetch websites:", error);
            setWebsites([]);
        }
    };
    

    useEffect(()=>{

       const intervalId=setInterval(() => {
        getWebsites()
       }
       
       , 30000);


       return () => clearInterval(intervalId);

    },[getToken])

    return {websites,getWebsites};
}