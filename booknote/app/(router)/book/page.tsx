'use client'

import BookDetail from "@/app/_components/book/book_detail"
import BookEmpty from "@/app/_components/book/book_empty"
import BookSidebar from "@/app/_components/sidebar/book/book_sidebar"
import useBookStore from "@/stores/book-store"
import useMemoStore from "@/stores/memo-store"
import { useEffect, useMemo } from "react"
import { useStore } from "zustand"

const Page=()=>{
    const {bookList,setBookList}=useStore(useBookStore,(state)=>state)    
    const {setMemoList}=useStore(useMemoStore,(state)=>state)

    const user={ id:0, email:'' , username:'' }

    const book1={ id: 1, title: '협업의 기술', author: 'test' , user , isPinned: true , createAt: new Date(), updateAt: new Date()}
    const book2={ id: 2, title: '리더십 에센셜', author: 'test', user , isPinned: false , createAt: new Date(), updateAt: new Date()}

    const memo1={ id:0, book:book1 , content:'# 팀워크의 중요성\n\n- 효과적인 협업이 성과를 높인다\n- 다양한 관점이 혁신을 촉진한다' , createAt: new Date() , updateAt: new Date()}
    const memo2={ id:1, book:book1 , content:'## 효과적인 의사소통 방법\n\n1. 경청하기\n2. 명확하게 표현하기\n3. 피드백 주고받기' , createAt: new Date() , updateAt: new Date()}
    const memo3={ id:2, book:book1 , content:'# 리더십의 기본 원칙\n\n- 비전 제시하기\n- 팀원 동기부여\n- 책임감 있는 의사결정' , createAt: new Date() , updateAt: new Date()}
    const memo4={ id:3, book:book1 , content:'# 리11원칙\n\n- 비전 sda\n- 팀원 asd부여\n- 책임감 있는 의사결정' , createAt: new Date() , updateAt: new Date()}

    useEffect(()=>{
        setBookList([book1,book2])
        setMemoList([memo1,memo2,memo3,memo4])
    },[])

    

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-50 text-gray-900">
            <BookSidebar></BookSidebar>
            <main className="flex-grow overflow-hidden bg-white relative">
                <div className="h-full flex flex-col">
                    <div className="flex-grow overflow-auto p-4 md:p-8">
                        {bookList.length>0?(
                                <BookDetail></BookDetail>
                            ):(
                                <BookEmpty></BookEmpty>
                            )
                        }
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Page