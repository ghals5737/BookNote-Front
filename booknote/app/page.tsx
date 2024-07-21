import Image from "next/image";
import Header from "./_components/header/header";
import CreateMemo from "./_components/memo/creatememo";
import MemoList from "./_components/sidebar/memolist";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header></Header>
      <main className="flex min-h-screen flex-col items-center justify-between p-2">
        <div className="w-full">
          <CreateMemo></CreateMemo>
          <MemoList></MemoList>
        </div>
      </main>
    </div>
  );
}


