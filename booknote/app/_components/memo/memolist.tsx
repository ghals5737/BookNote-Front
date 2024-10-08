'use client'
import { Button } from "@/components/ui/button"
import MemoListChild from "../memo/memo_list_child"
import { Calendar, PlusCircle, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useState, useMemo } from "react";
import CreateMemo from "./creatememo"
import { useStore } from "zustand"
import useMemoStore from "@/stores/memo-store"
import MemoApi from "@/api/memos"
import useBookStore from "@/stores/book-store"
import { Skeleton } from "@/components/ui/skeleton"

const MemoList=()=>{
    const [isCreatingMemo, setIsCreatingMemo] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const {memoList,setMemoList,setMemo}=useStore(useMemoStore,(state)=>state);
    const { book } = useStore(useBookStore, (state) => state);

    const memoApi = useMemo(() => new MemoApi(), []); 

    useEffect(()=>{
      memoApi.getMemosByBookId(book.id).then(res=>{
        setMemoList(res);
        setIsLoading(false);
      }).catch(err => {
        console.error(err);
        setIsLoading(false);
      });
    },[memoApi,setMemoList,book.id])

    const LoadingSkeleton = () => (
      <>
        <div className="flex items-center justify-between p-4">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-10 w-24" />
        </div>
        <Skeleton className="h-12 w-full" />
        {[...Array(5)].map((_, index) => (
          <div key={index} className="p-4 flex flex-col border-b-[1px] border-green-200">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-4 rounded-full mr-1" />
              ))}
            </div>
          </div>
        ))}
      </>
    );

    const selectMemo=(memo:Memo)=>{
      setMemo(memo)
    }

    return(
      <div className="w-full">
        {isLoading ? (
        <LoadingSkeleton />
        ) : (<>
          <div className="flex items-center justify-between p-4">
              <div>
                  <h3 className="flex items-center space-x-2 text-xl font-bold">
                      <Calendar className="h-6 w-6 text-green-500" />
                      <span>메모 히스토리</span>
                  </h3>
                  <p className="text-gray-500">이전에 작성한 메모들을 확인해보세요.</p>
              </div>
              <Button
                  variant="outline"
                  className={`text-white ${isCreatingMemo ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                  onClick={() => setIsCreatingMemo(!isCreatingMemo)}
              >
                  {isCreatingMemo ? (
                      <>
                          <X className="mr-2 h-4 w-4" />
                          취소
                      </>
                  ) : (
                      <>
                          <PlusCircle className="mr-2 h-4 w-4" />
                          메모 추가
                      </>
                  )}
              </Button>
          </div>
          {isCreatingMemo && (
              <div className="mt-4 p-4 bg-white rounded-lg shadow">
                  <CreateMemo />
              </div>
          )}
          <div className="mt-4 max-h-96 overflow-y-auto">
            {
              memoList.map((memo,index)=>(
                <div key={index} onClick={()=>selectMemo(memo)}>
                  <MemoListChild                   
                    memo={memo}
                  />
                </div>
              ))
            }
          </div>
          </>
      )} 
      </div>
    )
}

function CalendarIcon(props:any) {
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
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" />
      </svg>
    )
  }
export default MemoList