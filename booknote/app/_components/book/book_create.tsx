'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Book, Loader2, X } from 'lucide-react'
import SearchApi from '@/api/search'
import Image from 'next/image'
import useUserStore from "@/stores/user-store"
import { useStore } from 'zustand'
import useBookStore from '@/stores/book-store'
import BookApi from '@/api/books'
import ActivityApi from '@/api/activity'

const searchApi = new SearchApi()
const bookApi = new BookApi()
const activityApi = new ActivityApi()

const searchBooks = async (query: string): Promise<SearchBook[]> => {
  await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay
  return searchApi.searchBooks(query)
}

interface SearchBook {
  title: string;
  image: string;
  author: string;
  description: string;
  index: number;
}
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const BookCreate = () => {
  const {user}=useStore(useUserStore,(state)=>state)    
  const {addBook}=useStore(useBookStore,(state)=>state)  
  const [isOpen, setIsOpen] = useState(false)
  const [isFirst, setIsFirst] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [manualTitle, setManualTitle] = useState('')
  const [searchResults, setSearchResults] = useState<SearchBook[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedBook, setSelectedBook] = useState<SearchBook | null>(null)
  const [hoveredBook, setHoveredBook] = useState<SearchBook | null>(null) 

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query) {
        setIsLoading(true)
        const results = await searchApi.searchBooks(query) 
        setSearchResults(results)        
        setSelectedBook(null)        
        setIsLoading(false)            
      } else {
        setSearchResults([])
        setIsLoading(false)
      }
    }, 300),
    []
  )

  useEffect(() => {        
    if (searchQuery!==''&&isOpen) { 
      console.log(searchQuery)         
      debouncedSearch(searchQuery)           
    }
  }, [searchQuery, debouncedSearch, isOpen])


  const handleAddBook = async() => {
    if (selectedBook) {
      console.log(`Adding book: ${selectedBook.title}`)
      const book=await bookApi.create({
        userId:user.id,
        title:selectedBook.title,
        isPinned:false
      })
      await activityApi.create(activityApi.generateActivity(
        'book.create',
        user,
        activityApi.convertBookTarget(book)
      ))
      addBook(book)
      setIsOpen(false)
      setSelectedBook(null)
      setSearchQuery('')
      setManualTitle('')
    } else if (manualTitle) {
      console.log(`Adding book: ${manualTitle}`)
      const book=await bookApi.create({
        userId:user.id,
        title:manualTitle,
        isPinned:false
      })
      await activityApi.create(activityApi.generateActivity(
        'book.create',
        user,
        activityApi.convertBookTarget(book)
      ))
      addBook(book)
      setIsOpen(false)
      setSelectedBook(null)
      setSearchQuery('')
      setManualTitle('')
    }
  }

  const handleSelectBook = async(book: SearchBook) => {  
    if(selectedBook===null){
      await delay(300)
    }
    setSelectedBook(book)    
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">책 추가</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>새 책 추가</DialogTitle>
          <DialogDescription>
            도서를 검색하거나 직접 제목을 입력하여 추가하세요.
            {isLoading ? 'true':'false'}
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search">도서 검색</TabsTrigger>
            <TabsTrigger value="manual">직접 입력</TabsTrigger>
          </TabsList>
          <TabsContent value="search">
            <div className="space-y-4">
              <div className="relative">
                <Input
                  placeholder="도서명을 입력하세요"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)      
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('')
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </button>
                )}
              </div>
              <div className="flex">
                <ScrollArea className="h-[400px] w-1/2 rounded-md border p-4 overflow-y-auto">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <Loader2 className="h-6 w-6 animate-spin" />                      
                    </div>
                  ) : searchResults.length > 0 ? (                    
                    <ul className="space-y-2">
                      {searchResults.map((book) => (
                        <li
                          key={book.index}
                          className={`p-2 hover:bg-gray-100 cursor-pointer text-base font-semibold antialiased rounded-md transition-all duration-200 ${
                            selectedBook?.index === book.index
                              ? 'bg-blue-100 border-2 border-blue-500'
                              : ''
                          }`}
                          onMouseEnter={() => setHoveredBook(book)}
                          onMouseLeave={() => setHoveredBook(null)}
                          onClick={() => handleSelectBook(book)}
                        >
                          {book.title}
                        </li>
                      ))}
                    </ul>
                  ) : searchQuery ? (
                    <p className="text-center text-gray-500">검색 결과가 없습니다.</p>
                  ) : (
                    <p className="text-center text-gray-500">도서명을 입력하세요.</p>
                  )}
                </ScrollArea>
                <div className="w-1/2 p-4">
                  {(hoveredBook || selectedBook) && (
                    <div className="rounded-md border p-4">
                      <Image
                        src={(hoveredBook || selectedBook)!.image}
                        alt={(hoveredBook || selectedBook)!.title}
                        width={100}
                        height={150}
                        className="object-cover rounded mb-4 mx-auto"
                      />
                      <h3 className="font-semibold text-lg">{(hoveredBook || selectedBook)!.title}</h3>
                      <p className="text-sm text-gray-600">{(hoveredBook || selectedBook)!.author}</p>
                      <p className="text-sm text-gray-500 mt-2 line-clamp-3">{(hoveredBook || selectedBook)!.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="manual">
            <div className="space-y-4">
              <Input
                placeholder="책 제목을 입력하세요"
                value={manualTitle}
                onChange={(e) => setManualTitle(e.target.value)}
              />
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            취소
          </Button>
          <Button 
            onClick={handleAddBook} 
            disabled={(selectedBook === null && manualTitle === '')}
          >
            추가
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function debounce<F extends (...args: any[]) => any>(func: F, wait: number): F {
  let timeout: ReturnType<typeof setTimeout> | null = null
  return function(this: any, ...args: Parameters<F>) {
    const context = this
    if (timeout !== null) clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(context, args), wait)
  } as F
}

export default BookCreate;