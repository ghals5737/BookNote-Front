import moment from "moment";
import axiosInstance from './axiosInstance';

class ActivityApi{
    private apiUrl: string;

    constructor(){
        this.apiUrl='/activity';
    }

    async create(activity:Activity):Promise<Book>{
        const response=await axiosInstance.post(
            `${this.apiUrl}`,
            activity
        )
        return response.data
    }

    async getActivities(activitySearch:ActivitySearch):Promise<ActivityResponse>{
        const response=await axiosInstance.post<any>(
            `${this.apiUrl}/search`,
            activitySearch
        )
        return response.data        
    }

    generateActivity(action:string,user:User,target:Target):Activity{
        return {
            id:'',
            action:action,
            actor:{
                id:user.id,
                name:user.name,
                email:user.email
            },
            target:target,
            timestamp:moment(new Date()).valueOf()
        }
    }

    convertBookTarget(book:Book):BookTarget{
        return {   
            ...book,
            createAt:moment(book.createAt).format("YYYY.MM.DD HH:mm:ss"),
            updateAt:moment(book.updateAt).format("YYYY.MM.DD HH:mm:ss")
        }
    }
    
    convertMemoTarget(memo:Memo):MemoTarget{
        return {
            ...memo,
            book:this.convertBookTarget(memo.book),
            createAt:moment(memo.createAt).format("YYYY.MM.DD HH:mm:ss"),
            updateAt:moment(memo.updateAt).format("YYYY.MM.DD HH:mm:ss")
        }
    }

    convertUserTarget(user:User):UserTarget{
        return {
            ...user
        }
    }


}

export default ActivityApi