import UserApi from '@/api/users'
import type { NextApiRequest, NextApiResponse } from 'next'
import { cookies } from "next/headers"
import { NextResponse } from "next/server";

const userApi=new UserApi()

type ResponseData = {
  message: string
}

export async function GET(request: Request) {
    try{
        const access_token=await userApi.refresh({
            access_token:cookies().get("access_token")?.value!,
            refresh_token:cookies().get("refresh_token")?.value!
        })  
        console.log('access_token',access_token) 
        if(access_token!=null){ 
            cookies().set({
                name: "access_token",
                value: access_token,
                httpOnly: true,
                path: "/",
                maxAge: 60 * 60 * 24 * 24
            });
        }else{
            cookies().delete("access_token") 
            cookies().delete("refresh_token") 
        }
    }catch(e){
        cookies().delete("access_token") 
        cookies().delete("refresh_token") 
        return NextResponse.redirect("https://booknote.site"+"/login");
        //https://booknote.site
    }
    return NextResponse.json({ message: "Token refreshed" });
}