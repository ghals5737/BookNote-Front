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

  async login(userCreate:UserCreate):Promise<string>{
    const response=await axios.post<string>(
      `${this.apiUrl}/login`,
      userCreate
    )
    return response.data
  }
}

export default UserApi