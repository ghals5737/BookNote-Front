'use client'
import UserSidebar from "@/app/_components/sidebar/user/user_sidebar"
import History from "@/app/_components/user/history/history"
import { useSession } from "next-auth/react";
import useUserStore from "@/stores/user-store"
import { useStore } from "zustand"
import { useEffect, useState } from "react";
import ActivityApi from "@/api/activity";
import { addDays } from "date-fns";
import moment from "moment";

const activityApi = new ActivityApi()


const Page=()=>{
    const { data: session, status  } = useSession();
    const {user,setUser}=useStore(useUserStore,(state)=>state)
    const [activityResponse, setActivityResponse] = useState<ActivityResponse | null>(null)
    const [readingStatus, setReadingStatus] = useState<ReadingStatus | null>(null)

    const historyDataFetch = async () => {
        const activity_data = await activityApi.getActivities({
            actorId:user.id,
            from:moment(addDays(new Date(), -30)).valueOf(),   
            to:moment(new Date()).valueOf(),
            searchActions:["all"],
            page:0,
            size:20
          })  
        setActivityResponse(activity_data)
        // This should be calculated based on actual data
        setReadingStatus({ totalBooks: 10, totalMemos: 50, averagePerWeek: 2 })
      }

    useEffect(()=>{                
        if(status==="authenticated"){
            setUser(session.user)  
            historyDataFetch()          
        }
    },[status])
    
    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-50 text-gray-900">
            <UserSidebar></UserSidebar>
            <main className="flex-grow overflow-hidden bg-white relative">
                <div className="h-full flex flex-col">
                    <div className="flex-grow overflow-auto p-4 md:p-8">
                        <History
                            activityResponse={activityResponse}
                            setActivityResponse={setActivityResponse}
                            readingStatus={readingStatus}
                        ></History>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Page