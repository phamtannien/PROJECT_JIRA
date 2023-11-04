const initialState = {
    open: false,
    title: "",
    ComponentContentModal: <p>default content</p>,
    callBackSubmit: ()=>{alert("demo")}
}

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {

  case 'OPEN_MODAL':
    return { ...state, open:true }
    case 'CLOSE_MODAL':
        return { ...state, open:false }
    case "OPEN_FORM_EDIT_PROJECT": {
        return {...state, open: true,
        ComponentContentModal: action.Component,
      title:   action.title};
        
    }
    case "SET_SUBMIT_EDIT_PROJECT":{
        return{...state, callBackSubmit: action.submitFunction}
    }
    case "SET_SUBMIT_CREATE_TASK" : {
      return{...state, callBackSubmit: action.submitFunction}
    }
    case "OPEN_FORM_CREATE_TASK": {
      return {...state, open: true,
      ComponentContentModal: action.Component,
    title:   action.title};
    }
    
  default:
    return state
  }
}
