import {create} from 'zustand'

interface bookState{
    selectedBook:Book,
    bookList: Book[];
    setSelectedBook: (book: Book) => void;
    addBook: (book: Book) => void;
    setBookList: (bookList: Book[]) => void;
    updateBookList: (bok: Book)=> void;
}

const useBookStore = create<bookState>((set) => ({
    selectedBook: {
      id: -1,
      title: '',
      author: '',
      user: {
        id: 0,
        email: '',
        username: '',
      },
      isPinned: false,
      createAt: new Date(),
      updateAt: new Date(),
    },
    bookList: [],
    setSelectedBook: (newBook) => set({ selectedBook: newBook }),
    addBook: (newBook) => set((state) => ({ bookList: [...state.bookList, newBook] })),
    setBookList: (newBookList) => set({ bookList: newBookList }),
    updateBookList: (book) => set((state) => ({
      bookList:state.bookList.map(item=>{
        if(book.id==item.id){
          return book
        }
        return item
      })
    }))
  }));
  
  export default useBookStore;