import { USER_LOGIN } from "../../constants/api";
import { GET_USER_BY_PROJECT_ID, GET_USER_SEARCH, USER_LOGIN_TYPE } from "../../constants/userConstants";


let usLogin = {};

if(localStorage.getItem(USER_LOGIN)){
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const stateDefault = {
 
    userLogin : usLogin,
    userSearch: [],
    arrUser: []
    
}

export const userReducer = (state = stateDefault, action) =>{
    switch (action.type) {
        case USER_LOGIN_TYPE:{
            state.userLogin = action.userLogin;
            return {...state}
        }
        
        case GET_USER_SEARCH:{
            state.userSearch = action.lstUserSearch;
            
            return {...state}
        }
        case GET_USER_BY_PROJECT_ID:{
           
            return {...state, arrUser: action.arrUser}
        }
        
            default : return {...state}
    }
}