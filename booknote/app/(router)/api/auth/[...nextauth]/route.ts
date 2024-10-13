import UserApi from "@/api/users"
import NextAuth from "next-auth"
import { jwtDecode } from "jwt-decode"
import GoogleProvider from "next-auth/providers/google"

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
    }),
  ],
  pages: {
    signIn: '/login',  // Custom sign-in page route
  },
  
  callbacks: {
    async session({ session, token, user }) {
      // Modify or add extra logic for the session if needed
      console.log('================session log=================')
    //   console.log('user',user)
      console.log('token',token)
      console.log('session',session)
      console.log('=============================================')
      session.user={
        id:token.id as number,
        email:token.email as string,
        name:token.name as string,
        picture:token.picture as string
      }
      

      return session
    },
    async jwt({ token, trigger }) {
      // jwt 실행후 -> session 콜백 실행 
      // session에 클라이언트에서 쓸정보 저장
      // jwt는 해더에 넣을 토큰 저장
      if(trigger==="signIn"){
        console.log('================jwt log=================')
        console.log('token',token)
        const access_token=await userApi.login({
          email:token.email,
          name:token.name,
          picture:token.picture
        })//encode
        console.log('access_token',access_token)
        const keyBytes = Buffer.from(process.env.NEXTAUTH_SECRET!, 'base64');
        //decode
        console.log('dawd')
        const decode_token = jwtDecode(access_token)           
        console.log('decode_token',decode_token)
        console.log('=============================================')
        return {...decode_token}
      }
      if(trigger==="update"){

      }

      return token
    },
  },
})

export { handler as GET, handler as POST }
