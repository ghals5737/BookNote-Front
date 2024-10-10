'use client'

import { Button } from "@/components/ui/button"
import { Book, PlusCircle, Search, BookOpen } from "lucide-react"
import BookCreate from "./book_create"

const BookEmpty=()=>{
    return (
        <div className="container mx-auto px-4 py-8">      
            <div className="mt-12 text-center">
                <h2 className="text-2xl font-semibold mb-4">북노트 시작하기</h2>
                <p className="max-w-2xl mx-auto text-gray-600 mb-6">
                    책을 추가하고, 메모를 작성하고,독서 진행 상황을 추적하세요. 
                </p>
                <BookCreate></BookCreate>                
            </div>
        </div>
    )
}

export default BookEmpty