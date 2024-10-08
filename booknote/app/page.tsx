import Image from "next/image";
import Header from "./_components/header/header";
import CreateMemo from "./_components/memo/creatememo";
import BookList from "./_components/sidebar/booklist";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import MemoDetail from "./_components/memo/memo_detail";
import MemoList from "./_components/memo/memolist";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header></Header>
      <main className="flex min-h-screen flex-col md:flex-row bg-white">
        <aside className="hidden md:block md:w-64 bg-white border-r-[1px] border-green-200">
          <BookList />
        </aside>
        <div className="flex flex-col flex-1">
          <div className="w-full h-full mx-auto">
            {/* <CreateMemo></CreateMemo> */}
            <ResizablePanelGroup className="h-full" direction="horizontal">
              <ResizablePanel className="p-4 flex">
                <MemoList/>
              </ResizablePanel>
              <ResizableHandle className="bg-green-200" withHandle />
              <ResizablePanel className="flex">
                <MemoDetail></MemoDetail>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </main>
    </div>
  );
}


