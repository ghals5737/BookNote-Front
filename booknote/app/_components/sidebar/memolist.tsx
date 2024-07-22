import MemoListChild from "../memo/memo_list_child"

const MemoList=()=>{
    return(
        <div className="w-full">
          <h3 className="flex items-center space-x-2 text-xl font-bold">
            <CalendarIcon className="h-6 w-6 text-green-500" />
            <span>메모 히스토리</span>
          </h3>
          <p className="text-gray-500">이전에 작성한 메모들을 확인해보세요.</p>
          <div className="mt-4 max-h-96 overflow-y-auto">
            <MemoListChild></MemoListChild>
          </div>
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