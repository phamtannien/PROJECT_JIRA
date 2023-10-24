import { request } from "../configs/api";
import { TOKEN } from "../constants/api";

class UserService {
    signinApi(data){
        return request ({
            url: "/Users/signin",
            method: "POST",
            data: data,
           })
    }
    getAllProjectCategory(){
        return request ({
            url: "/ProjectCategory",
            method: "GET",
            
           })
    }
    createProject(newProject){
        return request ({
            url: "/Project/createProject",
            method: "POST",
            data: newProject
           })
    }
    createProjectAuthorization(newProject){
        return request ({
            url: "Project/createProjectAuthorize",
            method: "POST",
            data: newProject,
            headers: {'Authorization': "Bearer " + localStorage.getItem(TOKEN)}
           })
    }
    getListProject(){
        return request ({
            url: "Project/getAllProject",
            method: "GET",
            headers: {'Authorization': "Bearer " + localStorage.getItem(TOKEN)}
           })
    }
}

export const userService = new UserService()