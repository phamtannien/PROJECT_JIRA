import { EDIT_PROJECT, PUT_PROJECT_DETAIL } from "../../constants/projectConstant";

const initialState = {
    projectEdit:{
      "id": 0,
      "projectName": "string",
      "creator": 0,
      "description": "string",
      "categoryId": "string",
    },
    projectDetail:{}
}

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROJECT : {
      state.projectEdit = action.projectEditModel;
      return {...state}
    }
    case PUT_PROJECT_DETAIL : {
      state.projectDetail = action.projectDetail;
      return {...state}
    }
  default:
    return state
  }
}
