'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, BookOpen, Clock } from 'lucide-react'

interface UserProfile {
  name: string
  email: string
  bio: string
  avatarUrl: string
}

const Profile=()=> {
  const [profile, setProfile] = useState<UserProfile>({
    name: '김독서',
    email: 'reader@example.com',
    bio: '열정적인 독서가이자 지식 탐험가입니다. 다양한 장르의 책을 읽고 새로운 아이디어를 발견하는 것을 좋아합니다.',
    avatarUrl: 'https://i.pravatar.cc/150?img=68'
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // Here you would typically send the updated profile to your backend
    console.log('Saving profile:', profile)
    setIsEditing(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={profile.avatarUrl} alt={profile.name} />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{profile.name}</CardTitle>
              <CardDescription>{profile.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
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
              <div>
                <Label htmlFor="bio">자기소개</Label>
                <Textarea id="bio" name="bio" value={profile.bio} onChange={handleInputChange} rows={4} />
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
        </CardContent>
        <CardFooter className="flex justify-end">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)} className="mr-2">취소</Button>
              <Button onClick={handleSave}>저장</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>프로필 수정</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

export default Profile