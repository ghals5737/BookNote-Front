import axiosInstance from './axiosInstance';

class BookApi{
    private apiUrl: string;

    constructor(){
        this.apiUrl='/books';
    }

    async create(bookCreate:BookCreate):Promise<Book>{
        const response=await axiosInstance.post<Book>(
            `${this.apiUrl}`,
            bookCreate
        )
        return response.data
    }

    async getBooksByUserId(userId:number,isPinned:boolean):Promise<Book[]>{
        const response=await axiosInstance.get(`${this.apiUrl}/users/${userId}?isPinned=${isPinned}`)
        return response.data
    }

    async update(bookId:number,bookUpdate:BookUpdate):Promise<Book>{
        const response=await axiosInstance.put<Book>(
            `${this.apiUrl}/${bookId}`,
            bookUpdate
        )
        return response.data
    }

    async delete(bookId:number){
        await axiosInstance.delete(`${this.apiUrl}/${bookId}`)
    }
    async updateOrder(userId:number,bookOrderChages:BookOrderChange[]){
        const response=await axiosInstance.put<Book>(
            `${this.apiUrl}/orders/${userId}`,
            bookOrderChages
        )
        return response.data
    }
}

export default BookApi