'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Calendar, Clock, BookOpen } from 'lucide-react'

interface Activity {
  id: number
  type: 'read' | 'note' | 'finish'
  bookTitle: string
  timestamp: string
}

interface ReadingStats {
  totalBooks: number
  totalPages: number
  averagePerWeek: number
}

const History=()=> {
  const [activities] = useState<Activity[]>([
    { id: 1, type: 'read', bookTitle: '협업의 기술', timestamp: '2024-03-20 10:30' },
    { id: 2, type: 'note', bookTitle: '리더십 에센셜', timestamp: '2024-03-19 15:45' },
    { id: 3, type: 'finish', bookTitle: '효과적인 의사소통', timestamp: '2024-03-18 20:00' },
    // Add more activities as needed
  ])

  const [readingStats] = useState<ReadingStats>({
    totalBooks: 12,
    totalPages: 3650,
    averagePerWeek: 2.5
  })

  const renderActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'read':
        return <BookOpen className="w-5 h-5 text-blue-500" />
      case 'note':
        return <Clock className="w-5 h-5 text-green-500" />
      case 'finish':
        return <Calendar className="w-5 h-5 text-purple-500" />
    }
  }

  const renderActivityText = (activity: Activity) => {
    switch (activity.type) {
      case 'read':
        return `${activity.bookTitle} 읽기 시작`
      case 'note':
        return `${activity.bookTitle}에 메모 추가`
      case 'finish':
        return `${activity.bookTitle} 완독`
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">활동 기록 및 분석</h1>
      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activity">활동 기록</TabsTrigger>
          <TabsTrigger value="stats">독서 통계</TabsTrigger>
        </TabsList>
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>최근 활동</CardTitle>
              <CardDescription>당신의 최근 독서 활동을 확인하세요.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                {activities.map(activity => (
                  <div key={activity.id} className="flex items-start space-x-4 mb-4">
                    {renderActivityIcon(activity.type)}
                    <div>
                      <p className="font-medium">{renderActivityText(activity)}</p>
                      <p className="text-sm text-gray-500">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="stats">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">총 읽은 책</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{readingStats.totalBooks}권</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">총 페이지 수</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{readingStats.totalPages}페이지</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">주간 평균</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{readingStats.averagePerWeek}권</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default History