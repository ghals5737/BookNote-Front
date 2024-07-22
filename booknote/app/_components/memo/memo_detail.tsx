import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const MemoDetail=()=>{
    return(
        <div className="w-full">
            <div className="p-4 flex items-center gap-4 border-b-[1px] border-green-200">
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
            <div className="p-4">
                <div className="flex items-center">
                    <p className="mr-2 font-semibold">책 제목</p>
                    <div className="flex items-center">
                        <StarIcon className="h-4 w-4 fill-yellow-500" />
                        <StarIcon className="h-4 w-4 fill-yellow-500" />
                        <StarIcon className="h-4 w-4 fill-yellow-500" />
                        <StarIcon className="h-4 w-4 fill-gray-300" />
                        <StarIcon className="h-4 w-4 fill-gray-300" />
                    </div>
                </div>
                <p className="mt-4">
                시간은 우리에게 주어진 가장 소중한 자원이다. 그것을 어떻게 활용하느냐에 따라 삶의 질이 결정된다.
                </p>
                <div className="mt-2">
                    <Badge variant="outline">ddd</Badge>
                </div>
                <div className="flex justify-end mt-4">
                <button className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600">
                    수정하기
                </button>
                </div>
            </div>
        </div>
    )
}

function StarIcon(props:any) {
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
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    )
}

export default MemoDetail