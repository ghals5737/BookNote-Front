'use client'

import Link from "next/link"
import { Book } from 'lucide-react'
import UserDropDown from "../../user/user_dropdown"
import BookList from "../../book/book_list"
import BookCreate from "../../book/book_create"
import Image from 'next/image';

const BookSidebar=()=>{   
    return (
        <div className="w-full md:w-64 border-b md:border-r border-gray-200 p-4 flex flex-col bg-white">
            <div className="flex items-center justify-between mb-4">
                <Link href="/book">
                    <h1 className="text-xl font-bold flex items-center text-gray-800">
                    <Book className="mr-2" />                    
                    Book Note
                    </h1>
                </Link>
                <UserDropDown></UserDropDown>            
            </div>
            <BookList></BookList>           
            <BookCreate></BookCreate>
        </div>
    )
}

export default BookSidebar