import { USER_SIGNIN_API } from "../../constants/userConstants"


const initialState = {
    userLogin: null
}
export const cyberBugsReducer = (state = initialState, action) =>{
    switch (action.type) {
        case USER_SIGNIN_API:
            state.userLogin = action.payload
        break;
      }
      return {...state}
    }
    

