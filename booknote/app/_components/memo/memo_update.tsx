'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import dynamic from 'next/dynamic'
import { useState, useEffect, useRef } from 'react'

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor").then((mod) => mod.default),
    { ssr: false }
)

interface EditMemoDialogProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    content: string
  }

const MemoUpdate=({ isOpen, onOpenChange, content }: EditMemoDialogProps)=>{
    const [editedContent, setEditedContent] = useState(content)

    const handleSave=()=>{

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
                <MDEditor
                    value={editedContent}
                    onChange={(value) => setEditedContent(value || '')}
                    preview="live"
                    hideToolbar={true}
                    height={350}
                />                
                <DialogFooter>
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                    취소
                </Button>
                <Button onClick={handleSave}>저장</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default MemoUpdate