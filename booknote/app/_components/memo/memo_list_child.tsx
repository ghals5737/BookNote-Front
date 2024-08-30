'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import moment from "moment"
import { marked } from 'marked'
import { Trash2 } from "lucide-react"

const MemoListChild = ({ memo }: { memo: Memo}) => {
    const previewRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const parseMarkdown = async () => {
            if (previewRef.current) {
                marked.setOptions({
                    gfm: true,
                    breaks: true,
                });
                const html = await marked(memo.memo);
                previewRef.current.innerHTML = html;
            }
        };
        parseMarkdown();
    }, [memo.memo]);

    const deleteMemo = (id: number) => {
        // Implement delete functionality here
        //onDelete(id.toString());
    }

    return (
        <div className="p-6 w-full bg-white rounded-md mb-4 border border-gray-300 hover:border-green-500 transition-colors">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold mb-2">{memo.book.title}</h3>                
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700 hover:bg-red-100"
                    onClick={() => deleteMemo(memo.id)}
                >
                    <Trash2 className="h-5 w-5" />
                    <span className="sr-only">Delete memo</span>
                </Button>
            </div>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-sm font-medium text-gray-600">{memo.book.user.username}</p>
                    <p className="text-xs text-gray-500">{moment(memo.createAt).format("yyyy/MM/dd")}</p>
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
        </div>
    )
}

export default MemoListChild