interface Book{
    id:number;
    title:string;
    author:string;
    user:User;
    createAt:Date;
    updateAt:Date;
}

interface BookCreate{
    userId:number;
    title:string;
    author:string;
}

interface BookUpdate{
    title: string;
}