'use client'

const Content=()=>{
        const [selectedBook, setSelectedBook] = useState<number | null>(null)
      return (
        <main className="flex-grow overflow-hidden bg-white relative">
        <div className="h-full flex flex-col">
          <div className="flex-grow overflow-auto p-4 md:p-8">
            {selectedBook ? (
              
            ) : (
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">환영합니다!</h1>
                <p className="mb-4 text-gray-600">Book Note 앱에 오신 것을 환영합니다. 좌측 사이드바에서 책을 선택하거나 새 책을 추가하세요.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold mb-2 flex items-center text-gray-800">
                      <Book className="mr-2" /> 최근 책
                    </h2>
                    <ul className="text-gray-600">
                      {books.slice(0, 2).map(book => (
                        <li key={book.id}>{book.title}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">최근 메모</h2>
                    <ul className="text-gray-600">
                      {notes.slice(0, 2).map(note => (
                        <li key={note.id}>{note.content.split('\n')[0]}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">빠른 링크</h2>
                    <ul className="text-gray-600">
                      <li>새 책 추가</li>
                      <li>
                        <Link href="/profile" className="text-blue-500 hover:underline">프로필 보기</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Floating Add Note Button (Mobile only) */}
        <Button
          className="md:hidden fixed right-4 bottom-4 rounded-full shadow-lg"
          size="lg"
          onClick={() => setIsWritingSectionOpen(!isWritingSectionOpen)}
        >
          {isWritingSectionOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
        </Button>
      </main>
    </div>
      )  
}

export default Content