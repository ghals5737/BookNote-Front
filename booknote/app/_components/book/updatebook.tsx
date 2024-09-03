'use client'

import BookApi from "@/api/books"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useBookStore from "@/stores/book-store"
import useUserStore from "@/stores/user-store"
import { Edit, PlusCircle } from "lucide-react";
import { useState } from "react"
import { useStore } from "zustand"

const UpdateBook=({ book, isOpen, onOpenChange } : { book : Book, isOpen: boolean, onOpenChange: (open: boolean) => void })=>{
    const [title,setTitle]=useState(book.title)
    const [author,setAuthor]=useState(book.author)
    const [error, setError] = useState('')
    const {user}=useStore(useUserStore,(state)=>state)
    const {updateBookList}=useStore(useBookStore,(state)=>state)
    const bookApi=new BookApi()

    const handleSubmit = async(e:React.FormEvent) => {
        e.preventDefault()

        if(!title || !author){
            setError('Please fill in all fields')
        }else{
            const updatedBook=await bookApi.update(book.id,{                
                title:title                
            })
            updateBookList(updatedBook)            
            onOpenChange(false)
        }        
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogTrigger asChild>    
            <>
              <Edit className="mr-2 h-4 w-4" />
              <span>책 수정</span>            
            </>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-green-500">새 책 추가</DialogTitle>
              <DialogDescription>
                새로운 책의 제목과 저자를 입력하세요. 완료되면 '책 수정' 버튼을 클릭하세요.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  책 제목
                </Label>
                <Input
                  id="title"
                  placeholder="책 제목을 입력하세요"
                  className="col-span-3"
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
                  required
                />
              </div>
              {/* <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="author" className="text-right">
                  저자
                </Label>
                <Input
                  id="author"
                  placeholder="저자 이름을 입력하세요"
                  className="col-span-3"
                  value={author}
                  onChange={(e)=>setAuthor(e.target.value)}
                  required
                />
              </div> */}
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSubmit} className="px-4 py-2 text-white bg-green-500 rounded-full">책 수정</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    )
}

export default UpdateBook