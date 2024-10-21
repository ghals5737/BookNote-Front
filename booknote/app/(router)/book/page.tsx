'use client'

import { useState } from 'react'
import BookDetail from "@/app/_components/book/book_detail"
import BookEmpty from "@/app/_components/book/book_empty"
import BookSidebar from "@/app/_components/sidebar/book/book_sidebar"
import useBookStore from "@/stores/book-store"
import useMemoStore from "@/stores/memo-store"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useStore } from "zustand"
import useUserStore from "@/stores/user-store"
import BookApi from "@/api/books"
import SkeletonLoading from "@/app/_components/skeleton/skeleton_loading"
import { Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"

const bookApi = new BookApi()

const Page = () => {
    const { data: session, status } = useSession();
    const { bookList, pinBookList, setPinBookList, setBookList, setSelectedBook } = useStore(useBookStore, (state) => state)
    const { setMemoList } = useStore(useMemoStore, (state) => state)
    const { user, setUser } = useStore(useUserStore, (state) => state)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const bookDataFetch = async () => {
        const pin_book_list = await bookApi.getBooksByUserId(user.id, true)
        const book_list = await bookApi.getBooksByUserId(user.id, false)
        if (pin_book_list.length > 0) {
            setSelectedBook(pin_book_list[0])
        }
        if (pin_book_list.length === 0 && book_list.length > 0) {
            setSelectedBook(book_list[0])
        }
        setPinBookList(pin_book_list)
        setBookList(book_list)
    }

    useEffect(() => {
        if (status === "authenticated") {
            setUser(session.user)
            bookDataFetch()
        }
    }, [status])

    if (status !== "authenticated") {
        return <SkeletonLoading />
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (
        <div className="flex h-screen bg-gray-50 text-gray-900">
            <BookSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <main className="flex-grow overflow-hidden bg-white relative">
                <div className="h-full flex flex-col">
                    <div className="p-4 flex items-center justify-between md:justify-end">
                        <Button onClick={toggleSidebar} variant="outline" size="icon" className="md:hidden">
                            <Menu className="h-4 w-4" />
                            <span className="sr-only">Toggle Sidebar</span>
                        </Button>
                    </div>
                    <div className="flex-grow overflow-auto p-4 md:p-8">
                        {bookList.length > 0 || pinBookList.length > 0 ? (
                            <BookDetail />
                        ) : (
                            <BookEmpty />
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Page