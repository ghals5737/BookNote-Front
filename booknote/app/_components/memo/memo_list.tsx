'use client'

import { useEffect, useState } from "react"
import { useStore } from "zustand"
import ReactMarkdown from 'react-markdown'
import moment from 'moment'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2 } from 'lucide-react'
import MemoUpdate from "./memo_update"
import useBookStore from "@/stores/book-store"
import useMemoStore from "@/stores/memo-store"
import MemoApi from "@/api/memos"
import ActivityApi from "@/api/activity"
import useUserStore from "@/stores/user-store"

const memoApi = new MemoApi()
const activityApi= new ActivityApi()

const MemoList = () => {
    const { user } = useStore(useUserStore, (state) => state)
    const { selectedBook } = useStore(useBookStore, (state) => state)
    const { memoList, deleteMemo,  setMemo, setMemoList } = useStore(useMemoStore, (state) => state)
    const [isOpen, setIsOpen] = useState(false)
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [expandedMemoId, setExpandedMemoId] = useState<number | null>(null)

    useEffect(() => {
        if (selectedBook !== null) {
            memoApi.getMemosByBookId(selectedBook.id).then(data => {
                setMemoList(data)
            })
            activityApi.create(activityApi.generateActivity(
                'book.select',
                user,
                activityApi.convertBookTarget(selectedBook)
            ))
        }
    }, [selectedBook, setMemoList])

    const handleEditMemo = (memo: Memo) => {
        setMemo(memo)
        setContent(memo.content)
        setTitle(memo.title)
        setIsOpen(true)        
    }

    const onChange = (open: boolean) => {
        if (!open) {
            setMemo({
                id: 0,
                book: selectedBook,
                title:"",
                content: "",
                createAt: new Date(),
                updateAt: new Date()
            })
        }
        setIsOpen(open)
    }

    const toggleMemoExpansion = (selectedMemo: Memo) => {
        setExpandedMemoId(expandedMemoId === selectedMemo.id ? null : selectedMemo.id)
        activityApi.create(activityApi.generateActivity(
            'memo.select',
            user,
            activityApi.convertMemoTarget(selectedMemo)
        ))
    }

    const haldleDeleteMemo = async(memo:Memo)=>{
        const deletedMemo=await memoApi.delete(memo.id)
        deleteMemo(deletedMemo)
        await activityApi.create(activityApi.generateActivity(
            'memo.delete',
            user,
            activityApi.convertMemoTarget(memo)
        ))
    }

    return (
        <div className="bg-white">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">메모 목록</h2>
            <ScrollArea className="h-[calc(100vh-300px)]">
                {memoList.map((memo) => (
                    <div key={memo.id} className="mb-2 bg-gray-50 rounded-lg shadow-sm overflow-hidden">
                        <div 
                            className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-100"
                            onClick={() => toggleMemoExpansion(memo)}
                        >
                            <div className="flex-1">
                                <p className="font-medium text-gray-800 truncate">
                                    {memo.title}
                                </p>
                                <p className="mt-2 text-xs text-gray-500">
                                    {moment(memo.updateAt).format("YYYY.MM.DD HH:mm")}
                                </p>
                            </div>
                            <div className="flex items-center">
                                <Button variant="ghost" size="sm" onClick={(e) => {
                                    e.stopPropagation()
                                    handleEditMemo(memo)
                                }}>
                                    <Edit2 className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={(e) => {
                                    e.stopPropagation()
                                    haldleDeleteMemo(memo)
                                }}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        {expandedMemoId === memo.id && (
                            <div className="p-3 border-t border-gray-200">
                                <ReactMarkdown className="prose prose-sm max-w-none">
                                    {memo.content}
                                </ReactMarkdown>
                            </div>
                        )}
                    </div>
                ))}
            </ScrollArea>
            <MemoUpdate
                isOpen={isOpen}
                onOpenChange={onChange}
                content={content}
                title={title}
            />
        </div>
    )
}

export default MemoList