import { GET_ALL_PROJECT_CATEGORY } from "../types/userSignin"

const stateDefault = {
    arrProjectCategory:[]
}

export const projectCategoryReducer = (state= stateDefault, action)=>{
    switch (action.type) {
        case GET_ALL_PROJECT_CATEGORY:{
            state.arrProjectCategory = action.data;
            return {...state}
        }
        default: return {...state}
          
    }
}