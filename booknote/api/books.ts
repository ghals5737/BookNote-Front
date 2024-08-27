import axios from "axios";

class BookApi{
    private apiUrl: string;

    constructor(){
        this.apiUrl='http://localhost:8080/api/books';
    }

    async create(bookCreate:BookCreate):Promise<Book>{
        const response=await axios.post<Book>(
            `${this.apiUrl}`,
            bookCreate
        )
        return response.data
    }

    async getBooksByUserId(userId:number):Promise<Book[]>{
        const response=await axios.get(`${this.apiUrl}/users/${userId}`)
        return response.data
    }
}

export default BookApi