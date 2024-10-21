'use client'

import Link from "next/link"
import { Book, X } from 'lucide-react'
import UserDropDown from "../../user/user_dropdown"
import BookList from "../../book/book_list"
import BookCreate from "../../book/book_create"
import { Button } from "@/components/ui/button"

interface BookSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookSidebar = ({ isOpen, onClose }: BookSidebarProps) => {
  return (
    <div className={`
      fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 
      transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      md:relative md:translate-x-0
    `}>
      <div className="h-full flex flex-col p-4">
        <div className="flex items-center justify-between mb-4">
          <Link href="/book">
            <h1 className="text-xl font-bold flex items-center text-gray-800">
              <Book className="mr-2" />
              Book Note
            </h1>
          </Link>
          <div className="flex items-center">
            <UserDropDown />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden ml-2"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>
        </div>
        <div className="flex-grow overflow-auto">
          <BookList />
        </div>
        <div className="mt-4">
          <BookCreate />
        </div>
      </div>
    </div>
  )
}

export default BookSidebar