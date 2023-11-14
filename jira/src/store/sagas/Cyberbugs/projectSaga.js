import {call, delay, fork, take, takeEvery, takeLatest, put, select} from "redux-saga/effects"
import { GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_CATEGORY_SAGA } from "../../types/userSignin";
import { notification } from "antd";
import { projectService } from "../../../services/projectService";
import { CREATE_PROJECT_SAGA, DELETE_PROJECT_SAGA, GET_ALL_PROJECT, GET_ALL_PROJECT_SAGA, GET_LIST_PROJECT, GET_LIST_PROJECT_SAGA, GET_PROJECT_DETAIL, PUT_PROJECT_DETAIL, UPDATE_PROJECT_SAGA } from "../../../constants/projectConstant";
import { CLOSE_MODAL } from "../../../constants/modalConstant";
import { STATUS_CODE } from "../../../constants/api";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../../constants/loadingConstant";


function  * createProjectSaga (action){
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500)
try {
    //call api
const {data, status} = yield call(()=>projectService.createProjectAuthorization(action.newProject))
  
if(STATUS_CODE.SUCCESS){
    notification.success({
        message: "create success"
    })
    const navigate = yield select(state=>state.navigateReducer.navigate)
    navigate("/projectManagement")
}



} catch (error) {
    console.log(error.response.data);
    notification.warning({
        message: 'create fail'
    })

}
yield put ({
    type: HIDE_LOADING
})

}
export function * theoDoiCreateProjectSaga (){
    yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga)
}

function * getListProjectSaga(action){
    yield put({
        type: DISPLAY_LOADING
    })
    try {
        const {data, status} = yield call(()=> projectService.getListProject())
        
        if(status === STATUS_CODE.SUCCESS){
            yield put ({
                type: GET_LIST_PROJECT,
                projectList: data.content
            })
        }
        
    } catch (error) {
        console.log(error);
    }
    yield put ({
        type: HIDE_LOADING
    })
    }
    
    
    
    
    
    
    export function * theoDoiGetListProjectSaga(){
        yield takeLatest(GET_LIST_PROJECT_SAGA, getListProjectSaga)
       
    }
//update

function  * updateProjectSaga (action){
    try {
        //call api
    const {data, status} = yield call(()=>projectService.updateProject(action.projectUpdate))
        
    notification.success({
            message: "update success"
        })
        yield put ({
            type: GET_LIST_PROJECT_SAGA
        })
        yield put ({
            type : CLOSE_MODAL
        })
    
    
    
    } catch (error) {
        console.log(error.response.data);
        notification.warning({
            message: `update fail!!!  ${error.response.data.content}`
        })
    
    }
    
    }
    export function * theoDoiUpdateProjectSaga (){
        yield takeLatest(UPDATE_PROJECT_SAGA, updateProjectSaga)
    }

 //delete
 function  * deleteProjectSaga (action){
    try {
        //call api
    const {data, status} = yield call(()=>projectService.deleteProject(action.idProject))
        
    notification.success({
            message: "Delete success"
        })
        yield put ({
            type: GET_LIST_PROJECT_SAGA
        })
       
    
    
    
    } catch (error) {
        console.log(error.response.data);
        notification.warning({
            message: `update fail!!!  ${error.response.data.content}`
        })
    
    }
    
    }
    export function * theoDoiDeleteProjectSaga (){
        yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga)
    }   
 //get project detail
 function  * getProjectDetailSaga (action){
    try {
        //call api
    const {data, status} = yield call(()=>projectService.getProjectDetail(action.projectId))
        yield put({
            type: PUT_PROJECT_DETAIL,
            projectDetail: data.content,
        })
   
    } catch (error) {
        console.log(error.response.data);
      
    
    }
    
    }
    export function * theoDoiGetProjectDetail (){
        yield takeLatest(GET_PROJECT_DETAIL, getProjectDetailSaga)
    }   
//getAllProject
function * getProjectAllSaga(action){
    try {
        const {data, status} = yield call(()=> projectService.getAllProject())
        yield put ({
            type: GET_ALL_PROJECT,
            arrProject: data.content
        })
     
    } catch (error) {
        console.log(error.response.data);
    }
    }
    
   export function * theoDoiGetAllProjectSaga(){
        yield takeLatest(GET_ALL_PROJECT_SAGA, getProjectAllSaga)
       
    }