'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Book } from 'lucide-react'
import { Roboto } from 'next/font/google'
import { FcGoogle} from 'react-icons/fc'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})


const Login=()=> {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      await signIn('google', { callbackUrl: '/book' })
    } catch (error) {
      console.error('Failed to sign in:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`flex items-center justify-center min-h-screen bg-gray-100 ${roboto.className}`}>
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">북노트 로그인</CardTitle>
          <CardDescription className="text-center">
            구글 계정으로 로그인하여 북노트를 시작하세요
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Book className="w-16 h-16 text-primary" />
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full h-[40px] text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 border border-gray-300 rounded-md shadow-sm"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <div className="flex items-center justify-center w-full">
              <FcGoogle className="mr-2 text-xl" />
              <span className="text-black-54 font-medium">
               Google 계정으로 로그인
              </span>
            </div>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login