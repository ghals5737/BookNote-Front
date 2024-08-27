import axios from 'axios';

class UserApi{
    private apiUrl: string;

  constructor() {
    this.apiUrl = 'http://localhost:8080/api/users';
  }
  
  async create(userCreate:UserCreate):Promise<User>{
    const response=await axios.post<User>(
      `${this.apiUrl}`,
      userCreate
    )    
    return response.data
  }

  async login(userLogin:UserLogin):Promise<User>{
    const response=await axios.post<User>(
      `${this.apiUrl}/login`,
      userLogin
    )
    return response.data
  }
}

export default UserApi