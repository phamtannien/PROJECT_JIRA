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
    getTaskDetail(taskId){
        return request ({
            url: `/Project/getTaskDetail?taskId=${taskId}`,
            method: "GET",
           headers: {'Authorization': "Bearer " + localStorage.getItem(TOKEN)}
           
           })
    }
    updateStatusTask(taskUpdateStatus){
        return request ({
            url: "/Project/updateStatus",
            method: "PUT",
            data: taskUpdateStatus,
           headers: {'Authorization': "Bearer " + localStorage.getItem(TOKEN)}
           
           })
    }
    updateTask(taskUpdate){
        return request ({
            url: "Project/updateTask",
            method: "POST",
            data: taskUpdate,
           headers: {'Authorization': "Bearer " + localStorage.getItem(TOKEN)}
           
           })
    }
}
export const taskService = new TaskService()