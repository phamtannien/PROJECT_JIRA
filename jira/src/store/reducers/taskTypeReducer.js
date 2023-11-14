import { GET_ALL_TASK_TYPE } from "../../constants/taskTypeConstant"

const initialState = {
    arrTaskType:[]
}

export const taskTypeReducer = (state = initialState,action) => {
  switch (action.type) {

  case GET_ALL_TASK_TYPE:
    return { ...state, arrTaskType: action.arrTaskType }

  default:
    return state
  }
}
