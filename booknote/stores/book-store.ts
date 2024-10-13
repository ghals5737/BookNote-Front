import {create} from 'zustand'

interface bookState{
    selectedBook:Book,
    book:Book,
    bookList: Book[];
    pinBookList: Book[];
    setPinBookList: (bookList: Book[]) => void;
    setSelectedBook: (book: Book) => void;  
    setBook: (book: Book) => void;  
    addBook: (book: Book) => void;
    setBookList: (bookList: Book[]) => void;
    updateBookList: (book: Book)=> void;
    deleteBook: (book: Book)=>void;
    updatePinBookList: (book: Book)=> void;
    deletePinBook: (book: Book)=>void;
    addPinBook: (book: Book) => void;
}

const useBookStore = create<bookState>((set) => ({
    selectedBook: {
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
    },    
    book: {
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
    },    
    bookList: [],
    setSelectedBook: (newBook) => set({ selectedBook: newBook }),
    setBook: (newBook) => set({ book: newBook }),
    addBook: (newBook) => set((state) => ({ bookList: [...state.bookList, newBook] })),
    addPinBook: (newBook) => set((state) => ({ pinBookList: [...state.pinBookList, newBook] })),
    setBookList: (newBookList) => set({ bookList: newBookList }),
    updateBookList: (book) => set((state) => ({
      bookList:state.bookList.map(item=>{
        if(book.id==item.id){
          return book
        }
        return item
      })
    })),
    deleteBook: (book) => set((state) => ({
      bookList: state.bookList.filter(item => item.id !== book.id)
    })),
    pinBookList:[],
    setPinBookList: (newBookList) => set({ pinBookList: newBookList }),
    updatePinBookList: (book) => set((state) => ({
      pinBookList:state.pinBookList.map(item=>{
        if(book.id==item.id){
          return book
        }
        return item
      })
    })),
    deletePinBook: (book) => set((state) => ({
      pinBookList: state.pinBookList.filter(item => item.id !== book.id)
    })),
  }));
  
  export default useBookStore;