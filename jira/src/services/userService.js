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
    signupApi(data){
        return request ({
            url: "/Users/signup",
            method: "POST",
            data: data,
           })
    }
    



    getUserByProjectId(idProject){
        return request ({
            url: `/Users/getUserByProjectId?idProject=${idProject}`,
            method: "GET",
            headers: {'Authorization': "Bearer " + localStorage.getItem(TOKEN)}
           })
    }
   
    deleteUserProject(userProject){
        return request ({
            url: `Project/removeUserFromProject`,
            method: "POST",
            data: userProject,
            headers: {'Authorization': "Bearer " + localStorage.getItem(TOKEN)}
        
           })
          
    }
    
    getUser(keyWord){
        return request ({
            url: `/Users/getUser?keyword=${keyWord}`,
            method: "GET",
            headers: {'Authorization': "Bearer " + localStorage.getItem(TOKEN)}
        
           })
          
    }
    deleteUser(id){
        return request ({
            url: `/Users/deleteUser?id=${id}`,
            method: "DELETE",
            headers: {'Authorization': "Bearer " + localStorage.getItem(TOKEN)}
        
           })
          
    }
    deleteUser(userUpdate){
        return request ({
            url: `/Users/editUser`,
            method: "PUT",
           data: userUpdate
        
           })
          
    }
    asignUserProject(userProject){
        return request ({
            url: `/Project/assignUserProject`,
            method: "POST",
            data: userProject,
            headers: {'Authorization': "Bearer " + localStorage.getItem(TOKEN)}
        
           })
          
    }

}

export const userService = new UserService()