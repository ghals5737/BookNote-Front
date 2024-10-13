'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { useState, useMemo } from 'react'
import { useStore } from "zustand"
import useBookStore from "@/stores/book-store"
import BookApi from "@/api/books"
import BookUpdate from "./book_update"
import BookItem from "./book_item"

const bookApi = new BookApi()


const BookList = () => {
    const { selectedBook, setBook, deleteBook, setSelectedBook, bookList, pinBookList } = useStore(useBookStore, (state) => state)
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState('')   

    const handleEdit = (book: Book) => {
        setBook(book)
        setTitle(book.title)
        setIsOpen(true)
    }

    const handleDeleteBook = async (book: Book) => {
        if (window.confirm(`정말로 ${book.title} 이 책을 삭제하시겠습니까?`)) {
            await bookApi.delete(book.id)
            deleteBook(book)
        }
    }

    const onChange = (open: boolean) => {
        if (!open) {
            setBook({
                id: -1,
                title: '',
                user: {
                    id: 0,
                    email: '',
                    name: '',
                    picture: ''
                },
                isPinned: false,
                createAt: new Date(),
                updateAt: new Date(),
            })
            setTitle('')
        }
        setIsOpen(open)
    }

    return (
        <>
            <ScrollArea className="flex-grow">
                <div className="space-y-2">
                    {pinBookList.map(book => (
                        <BookItem
                            key={book.id}
                            book={book}
                            isSelected={selectedBook.id === book.id}
                            onSelect={setSelectedBook}
                            onEdit={handleEdit}
                            onDelete={handleDeleteBook}
                        />
                    ))}
                    {bookList.map(book => (
                        <BookItem
                            key={book.id}
                            book={book}
                            isSelected={selectedBook.id === book.id}
                            onSelect={setSelectedBook}
                            onEdit={handleEdit}
                            onDelete={handleDeleteBook}
                        />
                    ))}
                </div>
            </ScrollArea>
            <BookUpdate 
                isOpen={isOpen}
                onOpenChange={onChange}
                title={title}
            />
        </>
    )
}

export default BookList