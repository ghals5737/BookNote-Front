'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from 'react'
import { Pin } from 'lucide-react'

const BookList=()=>{
    const [books, setBooks] = useState([
        { id: 1, title: '협업의 기술', isPinned: true },
        { id: 2, title: '리더십 에센셜', isPinned: false },
    ])

    const [selectedBook, setSelectedBook] = useState<number | null>(null)

    return (
        <ScrollArea className="flex-grow">
        <div className="space-y-1">
            {books.map(book => (
            <div
                key={book.id}
                className={`p-2 rounded-lg cursor-pointer ${selectedBook === book.id ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                onClick={() => setSelectedBook(book.id)}
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