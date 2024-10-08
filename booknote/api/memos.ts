import axios from "axios";

class MemoApi{
    private apiUrl:string;

    constructor(){
        this.apiUrl='http://localhost:8080/api/memos';
    }

    async create(memoCreate:MemoCreate):Promise<Memo>{
        const response=await axios.post<Memo>(
            `${this.apiUrl}`,
            memoCreate
        )
        return response.data
    }

    async getMemosByBookId(bookId:number):Promise<Memo[]>{
        const response=await axios.get(`${this.apiUrl}/books/${bookId}`)
        return response.data
    }

    async update(id:number,memoUpdate:MemoUpdate):Promise<Memo>{
        const response=await axios.put<Memo>(
            `${this.apiUrl}/${id}`,
            memoUpdate
        )
        return response.data
    }
}

export default MemoApi