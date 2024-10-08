'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import useMemoStore from "@/stores/memo-store"
import { useStore } from "zustand"
import moment from "moment"
import { marked } from 'marked'
import { Star, Edit, PlusCircle } from "lucide-react"
import UpdateMemo from './updatememo'

const MemoDetail = () => {
    const { memo } = useStore(useMemoStore, (state) => state)
    const previewRef = useRef<HTMLDivElement>(null)
    const [isUpdatingMemo, setIsUpdatingMemo] = useState(false)

    useEffect(() => {
        const parseMarkdown = async () => {
            if (previewRef.current && memo) {
                marked.setOptions({
                    gfm: true,
                    breaks: true,
                })
                const html = await marked(memo.memo)
                previewRef.current.innerHTML = html
            }
        }
        parseMarkdown()
    }, [memo])

    if (memo.id==0||!memo.id) {
        return <div className="w-full p-6 text-center">메모를 선택해주세요.</div>
    }

    return (
        <div className="w-full bg-white rounded-md border border-gray-300">
            {isUpdatingMemo ? <UpdateMemo></UpdateMemo>:
            <div className="p-6">
                <div className="mb-4">
                    <h3 className="text-2xl font-bold mb-2">{memo.book.title}</h3>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-sm font-medium text-gray-600">{memo.book.user.username}</p>
                        <p className="text-xs text-gray-500">{moment(memo.createAt).format("yyyy/MM/dd")}</p>
                    </div>
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`h-4 w-4 ${i < 3 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 fill-gray-300'}`}
                            />
                        ))}
                    </div>
                </div>
                <div
                    ref={previewRef}
                    className="prose text-gray-700 mt-2 py-4 px-1 max-w-full"
                />
                <div className="mt-4 flex flex-wrap gap-2">
                    {/* {memo.tags && memo.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">{tag}</Badge>
                    ))} */}
                </div>
                <div className="flex justify-end mt-4">
                <Button
                  variant="outline"
                  className={`text-white ${isUpdatingMemo ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                  onClick={() => setIsUpdatingMemo(!isUpdatingMemo)}
              >
                  {isUpdatingMemo ? (
                      <>
                          <X className="mr-2 h-4 w-4" />
                          취소
                      </>
                  ) : (
                      <>
                          <PlusCircle className="mr-2 h-4 w-4" />
                          메모 수정
                      </>
                  )}
              </Button>
                </div>
            </div>
            }
        </div>        
    )
}

export default MemoDetail