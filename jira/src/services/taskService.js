import { request } from "../configs/api"
import { TOKEN } from "../constants/api"

class TaskService {
    createTask(taskOject){
        return request ({
            url: "/Project/createTask",
            method: "POST",
            data: taskOject,
            headers: {'Authorization': "Bearer " + localStorage.getItem(TOKEN)}
           
           })
    }
}
export const taskService = new TaskService()