'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Book } from 'lucide-react'
import { FcGoogle } from 'react-icons/fc'
import Image from 'next/image';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setError(null)
    try {
      await signIn('google', { callbackUrl: '/book' })
    } catch (error) {
      console.error('Failed to sign in:', error)
      setError('로그인에 실패했습니다. 다시 시도해 주세요.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[350px]">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold">북노트 로그인</h1>
          <p className="text-sm text-muted-foreground">
            구글 계정으로 로그인하여 북노트를 시작하세요
          </p>
        </div>
        <div className="flex justify-center my-6">
          <Image 
            src="/Booknote.svg" 
            alt="Booknote" 
            width={64} 
            height={64} 
            aria-hidden="true"            
          />         
        </div>
        <div className="space-y-2">
          <Button 
            className="w-full h-[40px] text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 shadow-sm"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            aria-label="Google 계정으로 로그인"
          >
            <div className="flex items-center justify-center w-full">
              <FcGoogle className="mr-2 text-xl" aria-hidden="true" />
              <span className="text-black-54 font-medium">
                {isLoading ? '로그인 중...' : 'Google 계정으로 로그인'}
              </span>
            </div>
          </Button>
          {error && (
            <p className="text-red-500 text-sm text-center" role="alert">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}