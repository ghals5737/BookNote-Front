'use client'
import { useState, useEffect, useCallback } from 'react'
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
import { Book, Loader2 } from 'lucide-react'

// Simulated API call
const searchBooks = async (query: string): Promise<{ id: number; title: string }[]> => {
  await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay
  return [
    { id: 1, title: `${query} - 검색 결과 1` },
    { id: 2, title: `${query} - 검색 결과 2` },
    { id: 3, title: `${query} - 검색 결과 3` },
  ]
}

const BookCreate=()=> {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [manualTitle, setManualTitle] = useState('')
  const [searchResults, setSearchResults] = useState<{ id: number; title: string }[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedBook, setSelectedBook] = useState<{ id: number; title: string } | null>(null)

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (query) {
        setIsLoading(true)
        searchBooks(query).then(results => {
          setSearchResults(results)
          setIsLoading(false)
        })
      } else {
        setSearchResults([])
      }
    }, 300),
    []
  )

  useEffect(() => {
    debouncedSearch(searchQuery)
  }, [searchQuery, debouncedSearch])

  const handleAddBook = () => {
    if (selectedBook) {
      // Here you would typically call an API to add the book
      console.log(`Adding book: ${selectedBook.title}`)
      setIsOpen(false)
      setSelectedBook(null)
      setSearchQuery('')
    } else if (manualTitle) {
      // Here you would typically call an API to add the book
      console.log(`Adding book: ${manualTitle}`)
      setIsOpen(false)
      setManualTitle('')
    }
  }

  const handleSelectBook = (book: { id: number; title: string }) => {
    setSelectedBook(book)
    setSearchQuery(book.title)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">책 추가</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>새 책 추가</DialogTitle>
          <DialogDescription>
            도서를 검색하거나 직접 제목을 입력하여 추가하세요.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search">도서 검색</TabsTrigger>
            <TabsTrigger value="manual">직접 입력</TabsTrigger>
          </TabsList>
          <TabsContent value="search">
            <div className="space-y-4">
              <Input
                placeholder="도서명을 입력하세요"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setSelectedBook(null)
                }}
              />
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : searchResults.length > 0 ? (
                  <ul className="space-y-2">
                    {searchResults.map((book) => (
                      <li key={book.id}>
                        <Button
                          variant="ghost"
                          className={`w-full justify-start ${selectedBook?.id === book.id ? 'bg-primary text-primary-foreground' : ''}`}
                          onClick={() => handleSelectBook(book)}
                        >
                          <Book className="mr-2 h-4 w-4" />
                          {book.title}
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : searchQuery ? (
                  <p className="text-center text-gray-500">검색 결과가 없습니다.</p>
                ) : (
                  <p className="text-center text-gray-500">도서명을 입력하세요.</p>
                )}
              </ScrollArea>
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

// Debounce function
function debounce<F extends (...args: any[]) => any>(func: F, wait: number): F {
  let timeout: ReturnType<typeof setTimeout> | null = null
  return function(this: any, ...args: Parameters<F>) {
    const context = this
    if (timeout !== null) clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(context, args), wait)
  } as F
}

export default BookCreate;