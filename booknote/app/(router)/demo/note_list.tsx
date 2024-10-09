'use client'

import { useState, useEffect, useRef } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import ReactMarkdown from 'react-markdown'
import { Button } from "@/components/ui/button"
import { Edit2 } from 'lucide-react'

const NoteList=()=>{
    const [notes, setNotes] = useState([
        { id: 1, bookId: 1, content: '# 팀워크의 중요성\n\n- 효과적인 협업이 성과를 높인다\n- 다양한 관점이 혁신을 촉진한다', timestamp: '2024-03-15 14:30' },
        { id: 2, bookId: 1, content: '## 효과적인 의사소통 방법\n\n1. 경청하기\n2. 명확하게 표현하기\n3. 피드백 주고받기', timestamp: '2024-03-15 15:45' },
        { id: 3, bookId: 2, content: '# 리더십의 기본 원칙\n\n- 비전 제시하기\n- 팀원 동기부여\n- 책임감 있는 의사결정', timestamp: '2024-03-16 10:00' },
    ])

    const [editingNote, setEditingNote] = useState<Note | null>(null)

    const handleSaveEditedNote = (updatedNote: Note) => {
        setNotes(notes.map(note => note.id === updatedNote.id ? updatedNote : note))
        setEditingNote(null)
      }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">메모 목록</h2>
            <ScrollArea className="h-[calc(100vh-300px)]">
            {notes.map((note) => (
                <div key={note.id} className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm">
                    <ReactMarkdown>{note.content}</ReactMarkdown>
                    <div className="flex justify-between items-center mt-2">
                        <p className="text-sm text-gray-500">{note.timestamp}</p>
                        <Button variant="ghost" size="sm" onClick={() => handleEditNote(note)}>
                            <Edit2 className="h-4 w-4 mr-2" />
                            수정
                        </Button>
                  </div>
                </div>
            ))}
            </ScrollArea>
        </div>
    )
}

export default NoteList