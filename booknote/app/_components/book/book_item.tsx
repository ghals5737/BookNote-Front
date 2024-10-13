'use client'

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Pin, Edit2, Trash2 } from 'lucide-react'
import moment from 'moment'

interface BookItemProps {
    book: Book
    isSelected: boolean
    onSelect: (book: Book) => void
    onEdit: (book: Book) => void
    onDelete: (book: Book) => void
}

const BookItem = ({ book, isSelected, onSelect, onEdit, onDelete }:BookItemProps) => {
    return(
    <div
        className={`p-2 rounded-lg cursor-pointer text-sm ${isSelected ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        onClick={() => onSelect(book)}
    >
        <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-1 flex-grow min-w-0">
                <span className="font-semibold truncate flex-grow min-w-0 max-w-full">{book.title}</span>
                {book.isPinned && (
                    <Pin className="w-4 h-4 text-yellow-500 flex-shrink-0"/>
                )}
            </div>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
            <span>{moment(book.updateAt).format("YYYY.MM.DD HH:mm")}</span>
            <div className="flex-shrink-0 flex space-x-1">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="p-1 h-6"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onEdit(book)
                                }}
                            >
                                <Edit2 className="w-3 h-3" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>수정</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="p-1 h-6"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onDelete(book)
                                }}
                            >
                                <Trash2 className="w-3 h-3" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>삭제</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    </div>
)}

export default BookItem