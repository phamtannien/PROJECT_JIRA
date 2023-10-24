const navigateState = {
    navigate: {}
};


export const navigateReducer = (state= navigateState, action) =>{
    switch (action.type) {
        case 'ADD_NAVIGATE':{
         state.navigate = action.navigate;  
         
         return {...state}
    }
    default: return {...state}
}
}