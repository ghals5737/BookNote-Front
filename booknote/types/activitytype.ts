interface Activity {
    id:string;
    action:string;
    actor:Actor;
    target:Target;
    timestamp:number;
}

interface ReadingStatus {
    totalBooks: number
    totalMemos: number
    averagePerWeek: number
  }

interface ActivitySearch{
    actorId:number
    from:number
    to:number
    searchActions:string[]
    page:number
    size:number
}

interface ActivityResponse{
    data:Activity[];
    total:number;
    page:number;
    hasNext:boolean;
}

type Target=BookTarget|MemoTarget|UserTarget|Search|BookUpdateTarget|MemoUpdateTarget|UserUpdate;

interface Actor{
    id:number;
    name:string;
    email:string;
}

interface BookTarget{
    id:number;
    title:string;
    user:UserTarget;
    isPinned:boolean;
    createAt:string;
    updateAt:string;
}

interface MemoTarget{
    id:number;
    book:BookTarget;
    title:string;
    content:string;
    createAt:string;
    updateAt:string;
}

interface UserTarget{
    id:number,
    email:string,
    name:string,
    picture:string
}

interface BookUpdateTarget{
    before:BookTarget;
    after:BookTarget;
}

interface MemoUpdateTarget{
    before:MemoTarget;
    after:MemoTarget;
}

interface Search{    
    query:string;
}

interface UserUpdate{
    before:UserTarget;
    after:UserTarget;
}