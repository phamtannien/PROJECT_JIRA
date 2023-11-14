import { request } from "../configs/api";
import { TOKEN } from "../constants/api";
class ProjectService {
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
            url: "/Project/createProjectAuthorize",
            method: "POST",
            data: newProject,
            headers: {'Authorization': "Bearer " + localStorage.getItem(TOKEN)}
           })
    }
    getListProject(){
        return request ({
            url: "/Project/getAllProject",
            method: "GET",
            headers: {'Authorization': "Bearer " + localStorage.getItem(TOKEN)}
           })
    }
    updateProject(projectUpdate){
        return request ({
            url: `/Project/updateProject?projectId=${projectUpdate.id}`,
            method: "PUT",
            data: projectUpdate,
            headers: {'Authorization': "Bearer " + localStorage.getItem(TOKEN)}
           })
    }
    deleteProject(id){
        return request ({
            url: `/Project/deleteProject?projectId=${id}`,
            method: "DELETE",
            headers: {'Authorization': "Bearer " + localStorage.getItem(TOKEN)}
           })
    }

    
    getProjectDetail(projectId){
        return request ({
            url: `/Project/getProjectDetail?id=${projectId}`,
            method: "GET",
            headers: {'Authorization': "Bearer " + localStorage.getItem(TOKEN)}
        
           })
          
    }
    getAllProject(){
        return request ({
            url: "/Project/getAllProject",
            method: "GET",
            
           })
    }
}
export const projectService = new ProjectService()