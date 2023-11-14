import { GET_ALL_STATUS } from "../../constants/statusContant"

const initialState = {
    arrStatus: []
}

export const statusReducer = (state = initialState, action) => {
  switch (action.type) {

  case GET_ALL_STATUS:
    return { ...state, arrStatus: action.arrStatus }

  default:
    return state
  }
}
