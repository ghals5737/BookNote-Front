const MemoList=()=>{
    return(
        <div className="w-full">
          <h3 className="flex items-center space-x-2 text-xl font-bold">
            <CalendarIcon className="h-6 w-6 text-green-500" />
            <span>메모 히스토리</span>
          </h3>
          <p className="text-gray-500">이전에 작성한 메모들을 확인해보세요.</p>
          <div className="mt-4 max-h-96 overflow-y-auto">
            <div className="p-4 bg-white rounded-md shadow-md mb-4">
              <p className="text-gray-700">"삶은 고통과 행복이 공존하는 것이다. 행복만을 추구하는 것은 불가능하다."</p>
              <p className="text-xs text-gray-500 mt-2">2023-05-01 - 도둑맞은 집중력</p>
            </div>
            <div className="p-4 bg-white rounded-md shadow-md mb-4">
              <p className="text-gray-700">
                "시간은 우리에게 주어진 가장 소중한 자원이다. 그것을 어떻게 활용하느냐에 따라 삶의 질이 결정된다."
              </p>
              <p className="text-xs text-gray-500 mt-2">2023-04-25 - 최적의 공부 뇌</p>
            </div>
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