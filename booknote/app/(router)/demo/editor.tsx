'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor").then((mod) => mod.default),
    { ssr: false }
)

const Editor=()=>{
    const [newNote, setNewNote] = useState('')

    return (
        <div className="p-4">
            <MDEditor
                value={newNote}
                onChange={(value) => setNewNote(value || '')}
                preview="live"
                hideToolbar={true}
                height={300}                     
            />
            
            <Button onClick={() => {/* 메모 저장 로직 */}} className="mt-4">
                메모 저장
            </Button>
        </div>
    )    
}
export default Editor;