import { USER_SIGNIN_API } from "../types/userSignin";

export const signinAction  = (email, password)=> {
   return {
    type: USER_SIGNIN_API,
    userLogin: {
        email: email,
        password: password
    }
   }
}