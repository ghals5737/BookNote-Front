'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import MemoApi from '@/api/memos'
import useMemoStore from '@/stores/memo-store'
import { useStore } from 'zustand'
import useBookStore from '@/stores/book-store'
import ActivityApi from '@/api/activity'
import useUserStore from '@/stores/user-store'

const memoApi = new MemoApi()
const activityApi = new ActivityApi()

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor").then((mod) => mod.default),
    { ssr: false }
)

const MemoCreate = () => {
    const [title, setTitle] = useState('')
    const [newContent, setNewContent] = useState('')
    const { addMemo, memoList } = useStore(useMemoStore, (state) => state)
    const { selectedBook } = useStore(useBookStore, (state) => state)
    const {user}=useStore(useUserStore,(state)=>state)    


    
    const saveMemo = async () => {       
        const memo = await memoApi.create({
            bookId: selectedBook.id,
            title: title.trim()?title:`${selectedBook.title}(${memoList.length+1})`,
            content: newContent
        })
        await activityApi.create(activityApi.generateActivity(
            'memo.create',
            user,
            activityApi.convertMemoTarget(memo)
        ))
        addMemo(memo)
        setTitle('')
        setNewContent('')
    }

    return (
        <div className="p-4">
            <meta name="color-scheme" content="light"></meta>
            <input
                type="text"
                placeholder="제목을 입력하세요 (선택사항)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
            />
            <MDEditor
                value={newContent}
                onChange={(value) => setNewContent(value || '')}
                preview="live"
                hideToolbar={true}
                height={300}
            />
            
            <Button 
                onClick={saveMemo} 
                className="mt-4"
                disabled={!newContent.trim()}
            >
                메모 저장
            </Button>
        </div>
    )
}

export default MemoCreate