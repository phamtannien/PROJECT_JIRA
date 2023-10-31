const stateDefault = {
    projectList: [],
    arrProject:[], //get project cho dropdow
}

export const projectCyberbugsReducer = (state = stateDefault, action)=>{
    switch (action.type) {
        case "GET_LIST_PROJECT":{
            state.projectList = action.projectList;
            return {...state}
        }
        
        case "GET_ALL_PROJECT":{
            //state.arrProject = action.arrProject;
            return {...state, arrProject:action.arrProject}
        }
        default: return {...state}
          
    }
}