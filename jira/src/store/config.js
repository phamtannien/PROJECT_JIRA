import { applyMiddleware, combineReducers, createStore } from "redux";
import reduxThunk from "redux-thunk";
import createMiddleWareSaga from 'redux-saga';
import { rootSaga } from "./sagas/rootSaga";
import { cyberBugsReducer } from "./reducers/cyberBugsReducer";
import { navigateReducer } from "./reducers/navigateReducer";
import { userReducer } from "./reducers/userReducer";
import { projectCategoryReducer } from "./reducers/projectCategoryReducer";
import { projectCyberbugsReducer } from "./reducers/projectCyberbugsReducer";
import { modalReducer } from "./reducers/modalCyberbugsReducer";
import { projectReducer } from "./reducers/projectReducer";
import { taskTypeReducer } from "./reducers/taskTypeReducer";
import { priorityReducer } from "./reducers/priorityReducer";
import { statusReducer } from "./reducers/statusReducer";
import { loadingReducer } from "./reducers/loadingReducer";
import { taskReducer } from "./reducers/taskReducer";






const middleWareSaga  = createMiddleWareSaga()



const rootReducer = combineReducers({
    cyberBugsReducer: cyberBugsReducer,
    navigateReducer: navigateReducer,
    userReducer: userReducer ,
     projectCategoryReducer  ,
      projectCyberbugsReducer ,
      modalReducer,
       projectReducer: projectReducer,
        taskTypeReducer,
        priorityReducer,
       statusReducer,
        loadingReducer,
         taskReducer
})

const store = createStore(
    rootReducer
    ,  applyMiddleware(reduxThunk,middleWareSaga)
    )

    middleWareSaga.run(rootSaga)

  export default store