interface User{
    id:number,
      email:string,
      name:string,
      picture:string
}

interface UserCreate{
    email:string | null | undefined;
    name:string | null | undefined;
    picture:string | null | undefined;
}

interface UserLogin{
    email:string;
    password:string;
}