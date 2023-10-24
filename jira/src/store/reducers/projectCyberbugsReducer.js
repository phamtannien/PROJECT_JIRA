const stateDefault = {
    projectList: []
}

export const projectCyberbugsReducer = (state = stateDefault, action)=>{
    switch (action.type) {
        case "GET_LIST_PROJECT":{
            state.projectList = action.projectList;
            return {...state}
        }
        default: return {...state}
          
    }
}