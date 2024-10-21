'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from 'react'
import { useStore } from "zustand"
import useBookStore from "@/stores/book-store"
import BookApi from "@/api/books"
import BookUpdate from "./book_update"
import BookItem from "./book_item"
import ActivityApi from "@/api/activity"
import useUserStore from "@/stores/user-store"
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'

const bookApi = new BookApi()
const activityApi = new ActivityApi()

const BookList = () => {
    const { selectedBook, setBook, deleteBook, setSelectedBook, bookList, pinBookList, setBookList } = useStore(useBookStore, (state) => state)
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState('')   
    const {user} = useStore(useUserStore, (state) => state) 

    const handleEdit = (book: Book) => {
        setBook(book)
        setTitle(book.title)
        setIsOpen(true)
    }

    const handleDeleteBook = async (book: Book) => {
        if (window.confirm(`정말로 ${book.title} 이 책을 삭제하시겠습니까?`)) {
            await bookApi.delete(book.id)
            deleteBook(book)
            await activityApi.create(activityApi.generateActivity(
                'book.delete',
                user,
                activityApi.convertBookTarget(book)
            ))
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
                image: '',
                order:0,
                createAt: new Date(),
                updateAt: new Date(),
            })
            setTitle('')
        }
        setIsOpen(open)
    }

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        const items = Array.from(bookList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        let idx = 0;
        const updatedItems = items.map(book => {
            return { ...book, order: idx++ }; // 새로운 객체를 반환하여 order 값 업데이트
        });

        setBookList(updatedItems);       
        
        bookApi.updateOrder(user.id,updatedItems.map(book=>{
            return {id:book.id,order:book.order}
        }))
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
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="books">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {bookList.map((book, index) => (
                                        <Draggable key={book.id} draggableId={book.id.toString()} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <BookItem
                                                        book={book}
                                                        isSelected={selectedBook.id === book.id}
                                                        onSelect={setSelectedBook}
                                                        onEdit={handleEdit}
                                                        onDelete={handleDeleteBook}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
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