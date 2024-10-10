import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

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
      console.log('=============================================')
      session.user=token

      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // Add custom token logic if needed
    //   console.log('================jwt log=================')
    //   console.log('user',user)
    //   console.log('token',token)
    //   console.log('account',account)
    //   console.log('profile',profile)
    //   console.log('=============================================')

      return token
    },
  },
})

export { handler as GET, handler as POST }
