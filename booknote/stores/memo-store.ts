import {create} from 'zustand'

interface memoState{
  memo:Memo;
  memoList: Memo[],
  content:string;
  setContent: (content:string)=>void;
  addMemo: (memo:Memo)=>void;
  setMemoList: (memoList: Memo[])=> void;
  setMemo: (memo:Memo)=>void;
  updateMemoList: (memo:Memo)=>void;
}

const useMemoStore = create<memoState>((set)=>({
  memo:{
    id:0,
    book:{
      id: 0,
      title: '',
      author: '',
      user: {
        id: 0,
        email: '',
        username: '',
      },
      isPinned: false,
      createAt: new Date(),
      updateAt: new Date(),
    },
    content:'',
    createAt: new Date(),
    updateAt: new Date(),
  },
  content:'',
  memoList: [],
  setContent: (newContent) => set({content:newContent}),
  addMemo: (newMemo) => set((state) => ({ memoList: [...state.memoList, newMemo] })),
  setMemoList: (newMemoList) => set({ memoList: newMemoList }),
  setMemo: (newMemo)=> set({memo:newMemo}),
  updateMemoList: (memo) => set((state)=>({
    memoList:state.memoList.map(item=>{
      if(memo.id==item.id){
        return memo
      }
      return item;
    })
  })),
}));

export default useMemoStore;