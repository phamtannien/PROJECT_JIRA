import { request } from "../configs/api"

class TaskTypeService {
    getAllTaskType(){
        return request ({
            url: "/TaskType/getAll",
            method: "GET",
            
           })
    }
}
export const taskTypeService = new TaskTypeService()