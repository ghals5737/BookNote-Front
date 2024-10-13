'use client'

import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Book, PenLine, Search, User, Pin, Plus, X } from 'lucide-react'
import MemoCreate from "../memo/memo_create"
import { useStore } from "zustand"
import useBookStore from "@/stores/book-store"
import useMemoStore from "@/stores/memo-store"
import MemoList from "../memo/memo_list"
import MemoApi from "@/api/memos"
import BookApi from "@/api/books"

const memoApi=new MemoApi()
const bookApi=new BookApi()

const BookDetail=()=>{
    const {selectedBook,setSelectedBook,bookList,addBook,addPinBook,deletePinBook,deleteBook}=useStore(useBookStore,(state)=>state)
    const {memoList,setMemoList,memo,setMemo}=useStore(useMemoStore,(state)=>state)
    const [isWritingSectionOpen, setIsWritingSectionOpen] = useState(false)

    const togglePin = async() => {   
        await bookApi.update(
            selectedBook.id,
            {
                title:selectedBook.title,
                isPinned:!selectedBook.isPinned
            })     
        const toggleBook={...selectedBook,isPinned:!selectedBook.isPinned}   
        if(selectedBook.isPinned){
            deletePinBook(toggleBook)
            addBook(toggleBook)
        }else{
            deleteBook(toggleBook)
            addPinBook(toggleBook)
        }    
        setSelectedBook(toggleBook)
    }
    const writingSectionRef = useRef<HTMLDivElement>(null)
    

    useEffect(()=>{
        memoApi.getMemosByBookId(selectedBook.id).then(data=>{
            setMemoList(data)
        })        
    },[selectedBook])

    return (
        <div>
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{selectedBook.title}</h1>
            <div className="flex items-center space-x-2">
            <Button
                variant="ghost"
                onClick={() => togglePin()}
            >
                <Pin className={`h-4 w-4 ${selectedBook.isPinned ? 'text-yellow-500' : 'text-gray-400'}`} />
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
            <MemoCreate></MemoCreate>
        </div>

        <MemoList></MemoList>
        
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">GPT 요약 및 정리</h2>
            <Button variant="outline">GPT로 요약 및 정리하기</Button>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-sm">
            <p className="text-gray-600">GPT 요약 및 정리 결과가 여기에 표시됩니다.</p>
            </div>
        </div>        
        </div>
    )
}

export default BookDetail;