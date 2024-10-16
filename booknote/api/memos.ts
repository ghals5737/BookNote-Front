import axiosInstance from './axiosInstance';

class MemoApi{
    private apiUrl:string;

    constructor(){
        this.apiUrl='/memos';
    }

    async create(memoCreate:MemoCreate):Promise<Memo>{
        const response=await axiosInstance.post<Memo>(
            `${this.apiUrl}`,
            memoCreate
        )
        return response.data
    }

    async getMemosByBookId(bookId:number):Promise<Memo[]>{
        const response=await axiosInstance.get(`${this.apiUrl}/books/${bookId}`)
        return response.data
    }

    async update(id:number,memoUpdate:MemoUpdate):Promise<Memo>{
        const response=await axiosInstance.put<Memo>(
            `${this.apiUrl}/${id}`,
            memoUpdate
        )
        return response.data
    }

    async delete(id:number):Promise<Memo>{
        const response=await axiosInstance.delete<Memo>(`${this.apiUrl}/${id}`)
        return response.data
    }
}

export default MemoApi