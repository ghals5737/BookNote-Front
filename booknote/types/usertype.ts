interface User{
    id:number;
    email:string;
    username:string;    
}

interface UserCreate{
    email:string;
    username:string;
    password:string;
}

interface UserLogin{
    email:string;
    password:string;
}