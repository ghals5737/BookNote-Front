'use client'

import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Book, PenLine, Search, User, Pin, Plus, X } from 'lucide-react'
import Editor from "./editor"
import NoteList from "./note_list"

const BookDetail=()=>{
    const [selectedBook, setSelectedBook] = useState<number>(1)
    const [books, setBooks] = useState([
        { id: 1, title: '협업의 기술', isPinned: true },
        { id: 2, title: '리더십 에센셜', isPinned: false },
    ])
    const [isWritingSectionOpen, setIsWritingSectionOpen] = useState(false)
    const togglePin = (bookId: number) => {
        setBooks(books.map(book => 
          book.id === bookId ? { ...book, isPinned: !book.isPinned } : book
        ))
    }
    const writingSectionRef = useRef<HTMLDivElement>(null)

    return (
        <div>
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{books.find(b => b.id === selectedBook)?.title}</h1>
            <div className="flex items-center space-x-2">
            <Button
                variant="ghost"
                onClick={() => togglePin(selectedBook)}
            >
                <Pin className={`h-4 w-4 ${books.find(b => b.id === selectedBook)?.isPinned ? 'text-yellow-500' : 'text-gray-400'}`} />
            </Button>
            <Button
                variant="outline"
                onClick={() => setIsWritingSectionOpen(!isWritingSectionOpen)}
            >
                {isWritingSectionOpen ? (
                <X className="mr-2 h-4 w-4" />
                ) : (
                <PenLine className="mr-2 h-4 w-4" />
                )}
                {isWritingSectionOpen ? '닫기' : '메모 추가'}
            </Button>
            </div>
        </div>
        
        {/* Writing Section (Slide down) */}
        <div 
            ref={writingSectionRef}
            style={{ display: isWritingSectionOpen ? 'block' : 'none' }}
        >
            <Editor></Editor>
        </div>

        <NoteList></NoteList>
        
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">GPT 요약 및 정리</h2>
            <Button variant="outline">GPT로 요약 및 정리하기</Button>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-sm">
            <p className="text-gray-600">GPT 요약 및 정리 결과가 여기에 표시됩니다.</p>
            </div>
        </div>
        <EditMemoDialog
            isOpen={editingNote !== null}
            onOpenChange={(open) => {
            if (!open) setEditingNote(null)
            }}
            memo={editingNote}
            onSave={handleSaveEditedNote}
        />
        </div>
    )
}

export default BookDetail;