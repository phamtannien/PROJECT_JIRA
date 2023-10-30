import { USER_LOGIN } from "../../constants/api";
import { USER_LOGIN_TYPE } from "../types/userSignin";


let usLogin = {};

if(localStorage.getItem(USER_LOGIN)){
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const stateDefault = {
    userLogin : usLogin,
    userSearch: []
}

export const userReducer = (state = stateDefault, action) =>{
    switch (action.type) {
        case USER_LOGIN_TYPE:{
            state.userLogin = action.userLogin;
            return {...state}
        }
        case "GET_USER_SEARCH":{
            state.userSearch = action.lstUserSearch;
            console.log("stateUser", state);
            return {...state}
        }
            default : return {...state}
    }
}