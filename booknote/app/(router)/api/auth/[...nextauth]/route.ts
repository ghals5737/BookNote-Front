import UserApi from "@/api/users"
import NextAuth from "next-auth"
import { jwtDecode } from "jwt-decode"
import GoogleProvider from "next-auth/providers/google"
import { cookies } from "next/headers"


const userApi=new UserApi()
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id:number,
      email:string,
      name:string,
      picture:string      
    }
  }
}
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],
  pages: {
    signIn: '/login',  // Custom sign-in page route
  },
  session: {
    strategy: 'jwt',
    maxAge:  60 * 60 * 24 * 7, // 1 day
  },  
  callbacks: {
    async session({session, token, user }) {     
      session.user={
        id:token.id as number,
        email:token.email as string,
        name:token.name as string,
        picture:token.picture as string        
      }   
      return session
    },
    async jwt({ token , trigger }) {      
      if(trigger==="signIn"){        
        const token_info=await userApi.login({
          email:token.email,
          name:token.name,
          picture:token.picture
        })        
        const decode_token = jwtDecode(token_info.access_token)           
     
        cookies().set({
          name: "access_token",
          value: token_info.access_token,
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 24
        });

        cookies().set({
          name: "refresh_token",
          value: token_info.refresh_token,
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 24
        });
    
        token={          
          ...decode_token
        }
        return token
      }
      if(trigger==="update"){
        console.log("==============================update======================")
        console.log("==============================update======================")
        console.log("==============================update======================")
        console.log("==============================update======================")

      }

      return token
    },
  },
})

export { handler as GET, handler as POST }
