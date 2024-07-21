import MarkDownEditor from "../editor/editor"

export default function CreateMemo(){
    return (
        <div className="flex flex-col items-center min-h-screen p-4">
      <div className="w-full max-w-3xl">
        <h3 className="flex items-center space-x-2 text-xl font-bold">
          <PencilIcon className="h-6 w-6 text-green-500" />
          <span>책 내용 메모하기</span>
        </h3>
        <p className="text-gray-500">책을 읽으면서 중요한 부분을 메모해보세요.</p>
        <div className="mt-4">
          <MarkDownEditor />
          <button className="px-4 py-2 mt-2 text-white bg-green-500 rounded-md">저장</button>
        </div>
      </div>
    </div>
    )
}

function PencilIcon(props:any) {
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
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        <path d="m15 5 4 4" />
      </svg>
    )
  }
  