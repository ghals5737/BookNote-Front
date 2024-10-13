interface Memo{
    id:number;
    book:Book;
    title:string;
    content:string;
    createAt:Date;
    updateAt:Date;
}

interface MemoCreate{
    bookId:number;
    title:string;
    content:string;
}

interface MemoUpdate{
    title:string;
    content:string;
}