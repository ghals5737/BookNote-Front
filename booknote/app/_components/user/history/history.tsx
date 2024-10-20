'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Calendar, Clock, BookOpen, Trash2, Edit, Plus, Eye, Search, Filter } from 'lucide-react'
import { useStore } from 'zustand'
import useUserStore from '@/stores/user-store'
import moment from 'moment'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addDays } from 'date-fns'
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DatePickerWithRange } from './datepicker_range'
import ActivityApi from '@/api/activity'
import { DateRange } from "react-day-picker"

const activityApi = new ActivityApi()



const activityOptions = [
  { value: "all", label: "모든 활동" },
  { value: "book.create", label: "책 생성" },
  { value: "book.delete", label: "책 삭제" },
  { value: "book.update", label: "책 수정" },
  { value: "book.select", label: "책 조회" },
  { value: "memo.create", label: "메모 생성" },
  { value: "memo.delete", label: "메모 삭제" },
  { value: "memo.update", label: "메모 수정" },
  { value: "memo.select", label: "메모 조회" },
]

interface HistoryProps{
  activityResponse:ActivityResponse | null;
  setActivityResponse:(activityResponse:ActivityResponse | null)=>void;
  readingStatus:ReadingStatus | null;

}


const History = ({activityResponse,setActivityResponse,readingStatus}:HistoryProps) => {
  const { user } = useStore(useUserStore, (state) => state)  
  const [activityTypes, setActivityTypes] = useState<string[]>(["all"])
  const [dateRange, setDateRange] = useState<DateRange>({
    from: addDays(new Date(), -30),
    to: new Date(),
  })  

  const handleDateRange=(newDateRange: DateRange | undefined)=>{
    if(newDateRange){
      setDateRange(newDateRange)
    }
  }

  const searchActivity = async()=>{
    const activity_data = await activityApi.getActivities({
      actorId:user.id,
      from:moment(dateRange.from).valueOf(),   
      to:moment(dateRange.to).valueOf(),
      searchActions:activityTypes,
      page:activityResponse!.page,
      size:20
    })        
    setActivityResponse(activity_data)    
  }

  const handleFilter = async ()=> {    
      await searchActivity()   
  }

  const renderActivityIcon = (action: string) => {
    switch (action) {
      case 'book.select':
      case 'memo.select':
        return <Eye className="w-5 h-5 text-blue-500" />
      case 'book.create':
      case 'memo.create':
        return <Plus className="w-5 h-5 text-green-500" />
      case 'book.update':
      case 'memo.update':
        return <Edit className="w-5 h-5 text-yellow-500" />
      case 'book.delete':
      case 'memo.delete':
        return <Trash2 className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  const renderActivityText = (activity: Activity) => {
    const targetType = activity.action.split('.')[0]
    const actionType = activity.action.split('.')[1]
    const targetTitle = 'title' in activity.target ? activity.target.title : '항목'

    switch (actionType) {
      case 'select':
        return `${targetTitle} ${targetType === 'book' ? '책' : '메모'}를 조회했습니다.`
      case 'create':
        return `새로운 ${targetType === 'book' ? '책' : '메모'} "${targetTitle}"를 생성했습니다.`
      case 'update':
        return `${targetTitle} ${targetType === 'book' ? '책' : '메모'}를 수정했습니다.`
      case 'delete':
        return `${targetTitle} ${targetType === 'book' ? '책' : '메모'}를 삭제했습니다.`
      default:
        return `${targetTitle}에 대한 활동이 있었습니다.`
    }
  }

  const handleActivityTypeChange = (checked: boolean, value: string) => {
    setActivityTypes(prev => {
      if (value === "all") {
        return checked ? ["all"] : []
      } else {
        const withoutAll = prev.filter(type => type !== "all")
        if (checked) {
          return [...withoutAll, value]
        } else {
          return withoutAll.filter(type => type !== value)
        }
      }
    })
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-8">활동 기록 및 분석</h1>
    <Tabs defaultValue="activity" className="space-y-6">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="activity">활동 기록</TabsTrigger>
        <TabsTrigger value="stats">독서 통계</TabsTrigger>
      </TabsList>
      <TabsContent value="activity">
        <h2 className="text-2xl font-bold mb-4">최근 활동</h2>
        <p className="mb-4">당신의 최근 독서 활동을 확인하세요.</p>
        <div className="flex flex-wrap gap-4 mb-6">
          <Button variant="outline" onClick={handleFilter}>
            검색 <Filter className="ml-2 h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">활동 유형 선택</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {activityOptions.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option.value}
                  checked={activityTypes.includes(option.value)}
                  onCheckedChange={(checked) => handleActivityTypeChange(checked, option.value)}
                >
                  {option.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DatePickerWithRange date={dateRange} setDate={handleDateRange}/>
        </div>
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          {activityResponse?.data.map((activity, index) => (
            <div key={index} className="flex items-start space-x-4 mb-4">
              {renderActivityIcon(activity.action)}
              <div>
                <p className="font-medium">{renderActivityText(activity)}</p>
                <p className="text-sm text-gray-500">{moment(activity.timestamp).format('YYYY-MM-DD HH:mm:ss')}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </TabsContent>
      <TabsContent value="stats">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">총 읽은 책</h3>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold">{readingStatus?.totalBooks}권</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">총 메모 수</h3>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold">{readingStatus?.totalMemos}개</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">주간 평균 독서량</h3>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold">{readingStatus?.averagePerWeek}권</p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  </div>
  )
}

export default History