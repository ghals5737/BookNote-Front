interface Book{
    id:number;
    title:string;
    user:User;
    image: string;
    order: number;
    isPinned:boolean;
    createAt:Date;
    updateAt:Date;
}

interface BookCreate{
    userId:number;
    title:string;   
    isPinned:boolean; 
    image:string|null;
    order:number;
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

interface BookOrderChange{
    id: number;
    order: number;
}
