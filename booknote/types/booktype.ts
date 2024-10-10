interface Book{
    id:number;
    title:string;
    author:string;
    user:User;
    isPinned:boolean;
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