'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { User } from 'lucide-react'
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu"

const UserDropDown = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost">
                    <User className="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>내 계정</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem >
                        <Link className="w-full" href="/profile">프로필</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem >
                        <Link className="w-full" href="/history">내 활동</Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem >
                    <button>로그아웃</button>  {/* 여기에 로그아웃 기능 추가 */}
                </DropdownMenuItem>
                
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserDropDown
