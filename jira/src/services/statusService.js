import { request } from "../configs/api"

class StatusService {
    getAllStatus(){
        return request ({
            url:"/Status/getAll",
            method: "GET",
            
           })
    }
}
export const statusService = new StatusService()