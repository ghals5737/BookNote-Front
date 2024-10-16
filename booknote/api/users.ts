import axiosInstance from './axiosInstance';

class UserApi{
    private apiUrl: string;

  constructor() {
    this.apiUrl = '/users';
  }
  
  async create(userCreate:UserCreate):Promise<User>{
    const response=await axiosInstance.post<User>(
      `${this.apiUrl}`,
      userCreate
    )    
    return response.data
  }

  async login(userCreate:UserCreate):Promise<Token>{
    const response=await axiosInstance.post<Token>(
      `${this.apiUrl}/login`,
      userCreate
    )
    return response.data
  }

  async refresh(token:Token):Promise<string>{
    const response=await axiosInstance.post<string>(
      `${this.apiUrl}/refresh`,
      token
    )
    return response.data
  }
}

export default UserApi