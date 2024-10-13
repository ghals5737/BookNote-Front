import axios from "axios";

class SearchApi{
    private apiUrl: string;

    constructor(){
        this.apiUrl='http://localhost:8080/api/search/books';
    }

    async searchBooks(query:string):Promise<SearchBook[]>{
        const response=await axios.get(`${this.apiUrl}?query=${query}`)
        return response.data
    }
   
}

export default SearchApi