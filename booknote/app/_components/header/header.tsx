'use client'

import { Label } from "@/components/ui/label";
import useUserStore from "@/stores/user-store";
import Link from "next/link"
import { useStore } from "zustand";


const Header=()=>{
    const {user,setUser}=useStore(useUserStore,(state)=>state);

    const isLogin=()=>{
      return user.email!='';
    }

    return(
        <header className="flex items-center justify-between p-4 bg-white border-b-[1px] border-green-200">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-green-500">Book Note</h1>
          {/* <nav className="flex space-x-4">
            <a href="#" className="text-gray-700">
              나의 기록
            </a>
            <a href="#" className="text-gray-700">
              돌려보기
            </a>
            <a href="#" className="text-gray-700">
              히스토리
            </a>
          </nav> */}
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="검색어를 입력해 주세요"
              className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <SearchIcon className="absolute right-3 top-3 h-5 w-5 text-gray-500" />
          </div>
          {
            isLogin()?
            <Label>
              {user.username}
            </Label>:
            <button className="px-4 py-2 text-white bg-green-500 rounded-full">
              <Link href={"/login"}>로그인</Link>
            </button>
          }
        </div>
      </header>
    )
}

export default Header

function SearchIcon(props:any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    )
  }