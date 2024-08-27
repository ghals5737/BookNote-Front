'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from 'next/link'
import { AlertCircle } from 'lucide-react'
import UserApi from '@/api/users'
import { useStore } from 'zustand'
import useUserStore from '@/stores/user-store'
import { useRouter } from 'next/navigation'


const Login=()=>{
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const userApi=new UserApi()
  const {user,setUser}=useStore(useUserStore,(state)=>state);
  const router=useRouter()

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      setError('Please fill in all fields')
    } else {
      setError('')
      console.log('Login attempted with:', { email, password })
      const user=await userApi.login({
        email:email,
        password:password
      })
      console.log('login',user)
      setUser(user)
      router.push('/')
    }    
  }
    return (
    <Card className="w-[350px] mx-auto mt-10">
      <CardHeader>
        <CardTitle className='text-green-500'>Login</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="m@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-2">
          <Button type="submit" className="w-full px-4 py-2 text-white bg-green-500 rounded-full">Sign In</Button>          
          <div className="flex justify-between w-full text-sm">
            <Link href="/forgot-password" className="text-muted-foreground hover:underline">
              Forgot password?
            </Link>
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
    )
}

export default Login;