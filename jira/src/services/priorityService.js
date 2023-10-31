import { request } from "../configs/api"

class PriorityService {
    getAllPriority(){
        return request ({
            url:`Priority/getAll`,
            method: "GET",
            
           })
    }
}
export const priorityService = new PriorityService()