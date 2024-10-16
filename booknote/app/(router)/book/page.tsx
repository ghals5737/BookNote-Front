'use client'

import BookDetail from "@/app/_components/book/book_detail"
import BookEmpty from "@/app/_components/book/book_empty"
import BookSidebar from "@/app/_components/sidebar/book/book_sidebar"
import useBookStore from "@/stores/book-store"
import useMemoStore from "@/stores/memo-store"
import { useSession } from "next-auth/react"
import { useEffect, useMemo } from "react"
import { useStore } from "zustand"
import useUserStore from "@/stores/user-store"
import BookApi from "@/api/books"
import MemoApi from "@/api/memos"
import SkeletonLoading from "@/app/_components/skeleton/skeleton_loading"
import ActivityApi from "@/api/activity"
const bookApi=new BookApi()  
const activityApi=new ActivityApi()

const Page=()=>{
    const { data: session, status  } = useSession();
    const {bookList,pinBookList,setPinBookList,setBookList,setSelectedBook}=useStore(useBookStore,(state)=>state)    
    const {setMemoList}=useStore(useMemoStore,(state)=>state)
    const {user,setUser}=useStore(useUserStore,(state)=>state)    
     
    const bookDataFetch=async()=>{
        const pin_book_list=await bookApi.getBooksByUserId(user.id,true)            
        const book_list=await bookApi.getBooksByUserId(user.id,false)
        if(pin_book_list.length>0){
            setSelectedBook(pin_book_list[0])
        }
        if(pin_book_list.length<0&&book_list.length>0){
            setSelectedBook(book_list[0])
        }
        setPinBookList(pin_book_list)
        setBookList(book_list) 
    }

    useEffect(()=>{                
        if(status==="authenticated"){
            setUser(session.user)
            bookDataFetch()    
        }
    },[status])

    if (status !== "authenticated") {
        return <SkeletonLoading />
    }
     
    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-50 text-gray-900">           
            <BookSidebar></BookSidebar>
            <main className="flex-grow overflow-hidden bg-white relative">
                <div className="h-full flex flex-col">
                    <div className="flex-grow overflow-auto p-4 md:p-8">
                        {bookList.length>0||pinBookList.length>0?(
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