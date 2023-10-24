import { USER_LOGIN } from "../../constants/api";
import { USER_LOGIN_TYPE } from "../types/userSignin";


let usLogin = {};

if(localStorage.getItem(USER_LOGIN)){
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const stateDefault = {
    userLogin : usLogin
}

export const userReducer = (state = stateDefault, action) =>{
    switch (action.type) {
        case USER_LOGIN_TYPE:{
            state.userLogin = action.userLogin;
            return {...state}
        }
            default : return {...state}
    }
}