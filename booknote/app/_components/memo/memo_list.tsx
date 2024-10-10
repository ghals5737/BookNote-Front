'use client'

import useMemoStore from "@/stores/memo-store"
import { useStore } from "zustand"
import { ScrollArea } from "@/components/ui/scroll-area"
import ReactMarkdown from 'react-markdown'
import { Button } from "@/components/ui/button"
import { Edit2 } from 'lucide-react'
import MemoUpdate from "./memo_update"
import { useState } from "react"
import useBookStore from "@/stores/book-store"
const moment = require('moment');

const MemoList=()=>{
    const {selectedBook}=useStore(useBookStore,(state)=>state)
    const {memoList,memo,setMemo}=useStore(useMemoStore,(state)=>state)
    const [isOpen,setIsOpen]=useState(false)
    const [content,setContent]=useState('')


    const handleEditMemo=(memo:Memo)=>{
        setMemo(memo)
        setIsOpen(true)    
        setContent(memo.content)    
    }

    const onChange=(open: boolean)=>{
        if(!open){
            setMemo({
                id: 0,
                book: selectedBook,
                content: "",
                createAt: new Date(),
                updateAt: new Date()
            })
        }
        setIsOpen(open)
    }
    
    return(
        <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">메모 목록</h2>
            <ScrollArea className="h-[calc(100vh-300px)]">
            {memoList.map((memo) => (
                <div key={memo.id} className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm">
                    <ReactMarkdown>{memo.content}</ReactMarkdown>
                    <div className="flex justify-between items-center mt-2">
                        <p className="text-sm text-gray-500">{moment(memo.createAt).format("YYYY-MM-dd")}</p>
                        <Button variant="ghost" size="sm" onClick={() => handleEditMemo(memo)}>
                            <Edit2 className="h-4 w-4 mr-2" />
                            수정
                        </Button>
                  </div>
                </div>
            ))}
            </ScrollArea>
            <MemoUpdate
                isOpen={isOpen}
                onOpenChange={onChange}
                content={content}
            />
        </div>
    )
}

export default MemoList