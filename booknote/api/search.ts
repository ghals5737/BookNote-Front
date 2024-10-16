import axiosInstance from './axiosInstance';

class SearchApi{
    private apiUrl: string;

    constructor(){
        this.apiUrl='/search/books';
    }

    async searchBooks(query:string):Promise<SearchBook[]>{
        const response=await axiosInstance.get(`${this.apiUrl}?query=${query}`)
        return response.data
    }
   
}

export default SearchApi