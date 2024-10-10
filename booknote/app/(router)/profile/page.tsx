import UserSidebar from "@/app/_components/sidebar/user/user_sidebar"
import History from "@/app/_components/user/history/history"
import Profile from "@/app/_components/user/profile/profile"

const Page=()=>{
    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-50 text-gray-900">
            <UserSidebar></UserSidebar>
            <main className="flex-grow overflow-hidden bg-white relative">
                <div className="h-full flex flex-col">
                    <div className="flex-grow overflow-auto p-4 md:p-8">
                        <Profile></Profile>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Page