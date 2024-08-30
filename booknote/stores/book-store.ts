import {create} from 'zustand'

interface bookState{
    book:Book,
    bookList: Book[];
    setBook: (book: Book) => void;
    addBook: (book: Book) => void;
    setBookList: (bookList: Book[]) => void;
}

const useBookStore = create<bookState>((set) => ({
    book: {
      id: 0,
      title: '',
      author: '',
      user: {
        id: 0,
        email: '',
        username: '',
      },
      createAt: new Date(),
      updateAt: new Date(),
    },
    bookList: [],
    setBook: (newBook) => set({ book: newBook }),
    addBook: (newBook) => set((state) => ({ bookList: [...state.bookList, newBook] })),
    setBookList: (newBookList) => set({ bookList: newBookList }),
  }));
  
  export default useBookStore;