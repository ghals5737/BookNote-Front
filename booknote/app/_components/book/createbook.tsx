'use client'

import BookApi from "@/api/books"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useBookStore from "@/stores/book-store"
import useUserStore from "@/stores/user-store"
import { PlusCircle } from "lucide-react";
import { useState } from "react"
import { useStore } from "zustand"

const CreateBook=()=>{
    const [title,setTitle]=useState('')
    const [author,setAuthor]=useState('')
    const [error, setError] = useState('')
    const {user}=useStore(useUserStore,(state)=>state)
    const {addBook}=useStore(useBookStore,(state)=>state)
    const bookApi=new BookApi()

    const handleSubmit = async(e:React.FormEvent) => {
        e.preventDefault()

        if(!title || !author){
            setError('Please fill in all fields')
        }else{
            const book=await bookApi.create({
                userId:user.id,
                title:title,
                author:author
            })
            addBook(book)
        }
    }

    return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="text-white bg-green-500 hover:bg-green-100">
              <PlusCircle className="mr-2 h-4 w-4" />
              책 추가
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-green-500">새 책 추가</DialogTitle>
              <DialogDescription>
                새로운 책의 제목과 저자를 입력하세요. 완료되면 '책 생성' 버튼을 클릭하세요.
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
              <div className="grid grid-cols-4 items-center gap-4">
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
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSubmit} className="px-4 py-2 text-white bg-green-500 rounded-full">책 생성</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    )
}

export default CreateBook