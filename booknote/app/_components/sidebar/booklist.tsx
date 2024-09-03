'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreateBook from "../book/createbook";
import { useStore } from "zustand";
import useBookStore from "@/stores/book-store";
import { useEffect, useState, useMemo } from "react";
import BookApi from "@/api/books";
import useUserStore from "@/stores/user-store";
import { Skeleton } from "@/components/ui/skeleton";
import { Book, Bookmark, Edit, MoreVertical, Star, Trash2 } from "lucide-react";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import UpdateBook from "../book/updatebook";

const BookList = () => {
  const { user } = useStore(useUserStore, (state) => state);
  const { bookList, setBookList, setBook, book } = useStore(useBookStore, (state) => state);
  const [selctedBook,setSelectedBook] = useState<Book>(book)
  const [isOpen, setIsOpen] = useState(false)

  const bookApi = useMemo(() => new BookApi(), []); 

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    bookApi.getBooksByUserId(user.id).then(res => {
      setBookList(res);
      setIsLoading(false);
    }).catch(err => {
      console.error(err);
      setIsLoading(false);
    });
  }, [user.id, setBookList, bookApi]); // Dependencies are now stable

  

  const LoadingSkeleton = () => (
    <>
      <div className="flex items-center justify-between p-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-10 w-24" />
      </div>
      <Skeleton className="h-12 w-full" />
      {[...Array(5)].map((_, index) => (
        <div key={index} className="p-4 flex flex-col border-b-[1px] border-green-200">
          <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-6 rounded-full" />
          </div>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-4 rounded-full mr-1" />
            ))}
          </div>
        </div>
      ))}
    </>
  );

  const selectBook=(book:Book)=>{
    setBook(book)
    console.log('book',book)
  }

  const selectBookMark=(e:React.FormEvent)=>{
    e.preventDefault()
    alert("b")
  }

  const handleUpdateBook = (book: Book) => {
    setSelectedBook(book)
    setIsOpen(true)
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)    
  }

  return (
    <div className="grid grid-cols-1 bg-white">
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2 text-xl p-4 font-bold">
              <Book className="h-6 w-6 text-green-500" />
              <span>책 목록</span>
            </div>
            <CreateBook />
          </div>
          <Link href="#" className="p-4 font-semibold text-primary border-b-[1px] border-green-200 hover:bg-green-100">
            전체
          </Link>
          {bookList.map((book, index) => (
            <div key={index} className="p-4 flex flex-col border-b-[1px] border-green-200 hover:bg-green-100">
              <div className="flex justify-between items-center">
                <button onClick={() => selectBook(book)} className="text-lg font-medium">{book.title}</button>
                <div className="flex items-center">
                  <button onClick={selectBookMark} className="ml-2">
                    <Bookmark className="h-4 w-4 text-gray-500 hover:text-yellow-500" />
                  </button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        {/* <span className="sr-only">Open menu</span> */}
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onSelect={() => handleUpdateBook(book)}>                        
                        <Edit className="mr-2 h-4 w-4" />
                        <span>책 수정</span>            
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => (book)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>삭제</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="flex items-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < 3 ? 'text-yellow-500' : 'text-gray-300'}`} />
                ))}
              </div>
            </div>
          ))}
          {isOpen && (
            <UpdateBook 
              book={selctedBook} 
              isOpen={isOpen}
              onOpenChange={handleOpenChange}
            />
          )}
        </>
      )}
    </div>
  );
}

export default BookList;
