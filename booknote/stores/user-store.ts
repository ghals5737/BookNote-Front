import {create} from 'zustand'
import {persist} from 'zustand/middleware'

interface userState{
    user:User,
    setUser:(user:User)=>void;
}

const useUserStore = create(
    persist<userState>(        
      (set) => ({
        user: {
            id:0,
            email:'',
            username:''
        },
        setUser: (newUser) => set({ user: newUser }),
      }),
      {
        name: 'userStore',
      },
    ),
  );
  
  export default useUserStore;  