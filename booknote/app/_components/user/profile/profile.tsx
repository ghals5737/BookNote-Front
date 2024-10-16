'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, BookOpen, Clock } from 'lucide-react'
import useUserStore from '@/stores/user-store'
import { useStore } from 'zustand'


const Profile=()=> {
  const { user } = useStore(useUserStore, (state) => state)  
  const [updateUser, setUpdateUser] = useState(user)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    setUpdateUser(user)
  },[user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUpdateUser(prev => ({ ...prev, [name]: value }))    
  }

  const handleSave = () => {
    // Here you would typically send the updated profile to your backend
    console.log('Saving profile:', user)
    setIsEditing(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user.picture} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
          {/* <CardContent>
          {isEditing ? (
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">이름</Label>
                <Input id="name" name="name" value={profile.name} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="email">이메일</Label>
                <Input id="email" name="email" type="email" value={profile.email} onChange={handleInputChange} />
              </div>              
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-500" />
                <span>{profile.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-gray-500" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-start space-x-2">
                <BookOpen className="w-5 h-5 text-gray-500 mt-1" />
                <p>{profile.bio}</p>
              </div>
            </div>
          )}
        </CardContent> */}
        {/* <CardFooter className="flex justify-end">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)} className="mr-2">취소</Button>
              <Button onClick={handleSave}>저장</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>프로필 수정</Button>
          )}
        </CardFooter> */}
      </Card>
    </div>
  )
}

export default Profile