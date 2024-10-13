'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useStore } from "zustand"
import dynamic from 'next/dynamic'
import { useState, useEffect, useRef, memo } from 'react'
import useMemoStore from "@/stores/memo-store"
import MemoApi from "@/api/memos"
import useBookStore from "@/stores/book-store"

const memoApi = new MemoApi()

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor").then((mod) => mod.default),
    { ssr: false }
)

interface EditMemoDialogProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    content: string
    title: string
  }

const MemoUpdate=({ isOpen, onOpenChange, title , content }: EditMemoDialogProps)=>{
    const [updateContent, setUpdateContent] = useState(content)
    const [updateTitle, setUpdateTitle] = useState(title)
    const { memoList, memo, updateMemoList } = useStore(useMemoStore, (state) => state)
    const { selectedBook } = useStore(useBookStore, (state) => state)

    useEffect(() => {
        setUpdateContent(content);
        setUpdateTitle(title);
      }, [content, title]);

    const updateMemo=async()=>{
        const updateMemo=await memoApi.update(memo.id,{
            title: updateTitle.trim()?updateTitle:`${selectedBook.title}(${memoList.length+1})`,
            content:updateContent            
        })
        updateMemoList(updateMemo)
        onOpenChange(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                <DialogTitle>메모 수정</DialogTitle>
                <DialogDescription>
                    아래에서 메모 내용을 수정하세요. 마크다운 형식을 지원합니다.
                </DialogDescription>
                </DialogHeader>  
                <input
                    type="text"
                    placeholder="제목을 입력하세요 (선택사항)"
                    value={updateTitle}
                    onChange={(e) => setUpdateTitle(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                />              
                <MDEditor
                    value={updateContent}
                    onChange={(value) => setUpdateContent(value || '')}
                    preview="live"
                    hideToolbar={true}
                    height={350}
                />                
                <DialogFooter>
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                    취소
                </Button>
                <Button onClick={updateMemo}>저장</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default MemoUpdate