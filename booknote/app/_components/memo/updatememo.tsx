'use client'

import { useStore } from "zustand"
import MarkDownEditor from "../editor/editor"
import useMemoStore from "@/stores/memo-store"
import MemoApi from "@/api/memos";
import { useState } from "react"
import useBookStore from "@/stores/book-store";

const UpdateMemo=()=>{
    const {content}=useStore(useMemoStore,(state)=>state);
    const {memo,addMemo,updateMemoList}=useStore(useMemoStore,(state)=>state);
    const memoApi=new MemoApi();
    const [error, setError] = useState('')

    const handleSubmit = async(e:React.FormEvent) => {
        e.preventDefault()
        
        if(!content){
          setError('Please fill in all fields')
        }else{
          const newMemo=await memoApi.update(memo.id,{            
            memo:content
          })
          updateMemoList(newMemo)
        }
    }

    return (
        <div className="flex flex-col items-center p-4">
        <div className="w-full max-w-3xl">                        
            <MarkDownEditor />
            <button onClick={handleSubmit} className="px-4 py-2 mt-2 text-white bg-green-500 rounded-md">수정</button>
        </div>
        </div>
    )    

}

export default UpdateMemo