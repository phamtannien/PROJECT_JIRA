import { GET_ALL_PRIORITY } from "../../constants/priorityConstant"

const initialState = {
    arrPriority:[]
}

export const priorityReducer = (state = initialState,action) => {
  switch (action.type) {

  case GET_ALL_PRIORITY:
    return { ...state, arrPriority: action.arrPriority }

  default:
    return state
  }
}