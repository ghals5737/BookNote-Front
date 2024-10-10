'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from 'react'
import { Pin } from 'lucide-react'
import { useStore } from "zustand"
import useBookStore from "@/stores/book-store"


const BookList=()=>{
    const {selectedBook,setSelectedBook,bookList}=useStore(useBookStore,(state)=>state)        

    return (
        <ScrollArea className="flex-grow">
        <div className="space-y-1">
            {bookList.map(book => (
            <div
                key={book.id}
                className={`p-2 rounded-lg cursor-pointer ${selectedBook.id === book.id ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                onClick={() => setSelectedBook(book)}
            >
                <div className="font-medium flex items-center justify-between">
                {book.title}
                {book.isPinned && <Pin className="w-4 h-4 text-yellow-500" />}
                </div>
            </div>
            ))}
        </div>
        </ScrollArea>
    )    
}

export default BookList