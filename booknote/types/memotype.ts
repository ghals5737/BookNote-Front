interface Memo{
    id:number;
    book:Book;
    memo:string;
    createAt:Date;
    updateAt:Date;
}

interface MemoCreate{
    bookId:number;
    memo:string;
}

interface MemoUpdate{
    memo:string;
}