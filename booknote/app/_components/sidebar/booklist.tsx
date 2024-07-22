import Link from "next/link"

const BookList=()=>{
    return(
        <div className="grid grid-cols-1 bg-white">
        <div className="flex items-center space-x-2 text-xl p-4 font-bold">
          <BookIcon className="h-6 w-6 text-green-500" />
          <span>내가 읽은 책 리스트</span>
        </div>
        <Link href="#" className="p-4 font-semibold text-primary border-b-[1px] border-green-200 hover:bg-green-100">
            전체
        </Link>
        {['book1', 'book2', 'book3', 'book4', 'book5'].map((book, index) => (
            <div key={index} className="p-4 flex flex-col border-b-[1px] border-green-200 hover:bg-green-100">
                <div>
                    <Link href="#">{book}</Link>
                    <button className="ml-2">
                        <BookmarkIcon className="h-4 w-4 text-gray-500 hover:text-yellow-500" />
                    </button>
                </div>
            <div className="flex items-center mt-2">
                {[...Array(3)].map((_, i) => (
                <StarIcon key={i} className="h-4 w-4 fill-yellow-500" />
                ))}
                {[...Array(2)].map((_, i) => (
                <StarIcon key={i} className="h-4 w-4 fill-gray-300" />
                ))}
            </div>
            </div>
        ))}
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

function BookmarkIcon(props:any) {
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
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    );
}

function BookIcon(props:any) {
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
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      </svg>
    )
  }

export default BookList