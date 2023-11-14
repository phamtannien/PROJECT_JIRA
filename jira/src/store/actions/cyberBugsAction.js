import { USER_SIGNIN_API } from "../../constants/userConstants";

export const signinAction  = (email, password)=> {
   return {
    type: USER_SIGNIN_API,
    userLogin: {
        email: email,
        password: password
    }
   }
}