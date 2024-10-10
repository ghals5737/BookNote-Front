'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { Book, User, BarChart, ArrowLeft } from 'lucide-react'

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import UserDropDown from "../../user/user_dropdown"

interface MenuItem {
  id: number
  name: string
  icon: React.ReactNode
  href: string
}

const UserSidebar = () => {
  const [selectedId, setSelectedId] = useState(0)
  const router = useRouter()

  const user_menu_list: MenuItem[] = [
    { id: 0, name: "프로필", icon: <User className="w-4 h-4 mr-2" />, href: "/profile" },
    { id: 1, name: "활동 기록", icon: <BarChart className="w-4 h-4 mr-2" />, href: "/history" },
    { id: 2, name: "Book Note로 돌아가기", icon: <ArrowLeft className="w-4 h-4 mr-2" />, href: "/book" }
  ]

  useEffect(() => {
    const path = window.location.pathname
    const currentMenu = user_menu_list.find(menu => menu.href === path)
    if (currentMenu) {
      setSelectedId(currentMenu.id)
    }
  }, [])

  const handleMenuClick = (menu: MenuItem) => {
    setSelectedId(menu.id)
    router.push(menu.href)
  }

  return (
    <div className="w-full md:w-64 border-b md:border-r border-gray-200 p-4 flex flex-col bg-white h-screen">
      <div className="flex items-center justify-between mb-8">
        <Link href="/book">
          <h1 className="text-xl font-bold flex items-center text-gray-800">
            <Book className="mr-2" />
            Book Note
          </h1>
        </Link>
        <UserDropDown />
      </div>
      <ScrollArea className="flex-grow pr-4">
        <div className="space-y-2">
          {user_menu_list.map(menu => (
            <Button
              key={menu.id}
              variant={selectedId === menu.id ? "secondary" : "ghost"}
              className={`w-full justify-start ${selectedId === menu.id ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              onClick={() => handleMenuClick(menu)}
            >
              {menu.icon}
              {menu.name}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export default UserSidebar