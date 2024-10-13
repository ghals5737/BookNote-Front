interface Book{
    id:number;
    title:string;
    user:User;
    isPinned:boolean;
    createAt:Date;
    updateAt:Date;
}

interface BookCreate{
    userId:number;
    title:string;   
    isPinned:boolean; 
}

interface BookUpdate{
    title: string;
    isPinned:boolean; 
}

interface SearchBook{
    title: string;
    image: string;
    author: string;
    description: string;
    index: number;
}
