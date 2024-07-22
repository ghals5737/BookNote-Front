import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const MemoListChild=()=>{
    return(
        <button className="p-4 w-full bg-white rounded-md mb-4 border border-gray-300 hover:bg-green-100 hover:border-green-500">
            <div className="flex items-center gap-4">
                <Avatar className="hidden sm:flex h-9 w-9">
                <AvatarImage src="/avatars/02.png" alt="Avatar" />
                <AvatarFallback>JL</AvatarFallback>
                </Avatar>
                <div className="flex flex-col flex-1">
                <div className="flex justify-between items-center">
                    <p className="text-sm font-medium leading-none">Jackson Lee</p>
                    <p className="text-xs text-gray-500">2023-04-25 - 최적의 공부 뇌</p>
                </div>
                </div>
            </div>
            <div className="flex flex-col items-start">
            <p className="text-gray-700 mt-2 py-4 px-1">
                    시간은 우리에게 주어진 가장 소중한 자원이다. 그것을 어떻게 활용하느냐에 따라 삶의 질이 결정된다.
            </p>
            <div className="mt-2">
                <Badge variant="outline">ddd</Badge>
            </div>
            </div>
        </button>
    )

}

export default MemoListChild