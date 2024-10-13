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

    async getBooksByUserId(userId:number,isPinned:boolean):Promise<Book[]>{
        const response=await axios.get(`${this.apiUrl}/users/${userId}?isPinned=${isPinned}`)
        return response.data
    }

    async update(bookId:number,bookUpdate:BookUpdate):Promise<Book>{
        const response=await axios.put<Book>(
            `${this.apiUrl}/${bookId}`,
            bookUpdate
        )
        return response.data
    }

    async delete(bookId:number){
        await axios.delete(`${this.apiUrl}/${bookId}`)
    }
}

export default BookApi