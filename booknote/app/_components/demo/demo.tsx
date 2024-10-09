'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Book, PenLine, Search, User, Pin, Plus, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import dynamic from 'next/dynamic'
import ReactMarkdown from 'react-markdown'

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })
import 'easymde/dist/easymde.min.css'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBook, setSelectedBook] = useState<number | null>(null)
  const [notes, setNotes] = useState([
    { id: 1, bookId: 1, content: '# 팀워크의 중요성\n\n- 효과적인 협업이 성과를 높인다\n- 다양한 관점이 혁신을 촉진한다', timestamp: '2024-03-15 14:30' },
    { id: 2, bookId: 1, content: '## 효과적인 의사소통 방법\n\n1. 경청하기\n2. 명확하게 표현하기\n3. 피드백 주고받기', timestamp: '2024-03-15 15:45' },
    { id: 3, bookId: 2, content: '# 리더십의 기본 원칙\n\n- 비전 제시하기\n- 팀원 동기부여\n- 책임감 있는 의사결정', timestamp: '2024-03-16 10:00' },
  ])
  const [newNote, setNewNote] = useState('')
  const [books, setBooks] = useState([
    { id: 1, title: '협업의 기술', isPinned: true },
    { id: 2, title: '리더십 에센셜', isPinned: false },
  ])
  const [isWritingSectionOpen, setIsWritingSectionOpen] = useState(false)
  const writingSectionRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddNote = () => {
    if (newNote.trim() && selectedBook) {
      setNotes([...notes, { id: Date.now(), bookId: selectedBook, content: newNote, timestamp: new Date().toLocaleString() }])
      setNewNote('')
      setIsWritingSectionOpen(false)
    }
  }

  const togglePin = (bookId: number) => {
    setBooks(books.map(book => 
      book.id === bookId ? { ...book, isPinned: !book.isPinned } : book
    ))
  }

  const selectedBookNotes = notes.filter(note => note.bookId === selectedBook)

  useEffect(() => {
    if (writingSectionRef.current) {
      writingSectionRef.current.style.height = isWritingSectionOpen ? '300px' : '0'
    }
  }, [isWritingSectionOpen])

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <div className="w-full md:w-64 border-b md:border-r border-gray-200 p-4 flex flex-col bg-white">
        <div className="flex items-center justify-between mb-4">
          <Link href="/">
            <h1 className="text-xl font-bold flex items-center text-gray-800">
              <Book className="mr-2" />
              Book Note
            </h1>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost">
                <User className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>내 계정</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/profile">프로필</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>설정</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>로그아웃</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="relative mb-4">
          <Input
            type="search"
            placeholder="검색어를 입력해 주세요"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="bg-gray-100 border-none"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <ScrollArea className="flex-grow">
          <div className="space-y-1">
            {filteredBooks.map(book => (
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
        <Button className="mt-4" variant="outline">
          <Plus className="mr-2 h-4 w-4" /> 책 추가
        </Button>
      </div>

      {/* Main Content */}
      <main className="flex-grow overflow-hidden bg-white relative">
        <div className="h-full flex flex-col">
          <div className="flex-grow overflow-auto p-4 md:p-8">
            {selectedBook ? (
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
                      className="hidden md:flex"
                    >
                      <PenLine className="mr-2 h-4 w-4" /> 메모 추가
                    </Button>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">메모 목록</h2>
                  <ScrollArea className="h-[calc(100vh-200px)] md:h-[calc(100vh-250px)]">
                    {selectedBookNotes.map((note) => (
                      <div key={note.id} className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm">
                        <ReactMarkdown>{note.content}</ReactMarkdown>
                        <p className="text-sm text-gray-500 mt-2">{note.timestamp}</p>
                      </div>
                    ))}
                  </ScrollArea>
                </div>
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">GPT 요약 및 정리</h2>
                  <Button variant="outline">GPT로 요약 및 정리하기</Button>
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-sm">
                    <p className="text-gray-600">GPT 요약 및 정리 결과가 여기에 표시됩니다.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">환영합니다!</h1>
                <p className="mb-4 text-gray-600">Book Note 앱에 오신 것을 환영합니다. 좌측 사이드바에서 책을 선택하거나 새 책을 추가하세요.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold mb-2 flex items-center text-gray-800">
                      <Book className="mr-2" /> 최근 책
                    </h2>
                    <ul className="text-gray-600">
                      {books.slice(0, 2).map(book => (
                        <li key={book.id}>{book.title}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">최근 메모</h2>
                    <ul className="text-gray-600">
                      {notes.slice(0, 2).map(note => (
                        <li key={note.id}>{note.content.split('\n')[0]}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">빠른 링크</h2>
                    <ul className="text-gray-600">
                      <li>새 책 추가</li>
                      <li>
                        <Link href="/profile" className="text-blue-500 hover:underline">프로필 보기</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Writing Section (Slide from bottom on desktop, Modal on mobile) */}
          <div 
            ref={writingSectionRef}
            className="bg-white border-t border-gray-200 transition-all duration-300 ease-in-out overflow-hidden md:absolute md:bottom-0 md:left-0 md:right-0"
            style={{ height: isWritingSectionOpen ? '300px' : '0' }}
          >
            {isWritingSectionOpen && (
              <div className="p-4 h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">새 메모 작성</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsWritingSectionOpen(false)}
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
                <SimpleMDE
                  value={newNote}
                  onChange={setNewNote}
                  options={{
                    placeholder: "새로운 메모를 작성하세요. 마크다운 문법을 지원합니다.",
                    spellChecker: false,
                    status: false,
                    minHeight: "150px",
                  }}
                />
                <Button onClick={handleAddNote} className="mt-auto">
                  메모 저장
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Floating Add Note Button (Mobile only) */}
        <Button
          className="md:hidden fixed right-4 bottom-4 rounded-full shadow-lg"
          size="lg"
          onClick={() => setIsWritingSectionOpen(true)}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </main>
    </div>
  )
}