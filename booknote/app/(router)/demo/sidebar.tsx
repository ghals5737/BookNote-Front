'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect, useRef } from 'react'
import { Book, PenLine, Search, User, Pin, Plus, X } from 'lucide-react'
import BookList from "./book_list"
import UserDropDown from "./user_dropdown"

const Sidebar=()=>{
    const [searchQuery, setSearchQuery] = useState('')
    const handleSearch = (query: string) => {
        setSearchQuery(query)
    }
    const [books, setBooks] = useState([
        { id: 1, title: '협업의 기술', isPinned: true },
        { id: 2, title: '리더십 에센셜', isPinned: false },
    ])

    return (
    <div className="w-full md:w-64 border-b md:border-r border-gray-200 p-4 flex flex-col bg-white">
        <div className="flex items-center justify-between mb-4">
            <Link href="/">
                <h1 className="text-xl font-bold flex items-center text-gray-800">
                <Book className="mr-2" />
                Book Note
                </h1>
            </Link>
            <UserDropDown></UserDropDown>        
        </div>
        <BookList></BookList>
        <Button className="mt-4" variant="outline">
        <Plus className="mr-2 h-4 w-4" /> 책 추가
        </Button>
  </div>)
}

export default Sidebar;