import { userService } from "../../../services/userService";
import {call, delay, fork, take, takeEvery, takeLatest, put, select} from "redux-saga/effects"
import { GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_CATEGORY_SAGA } from "../../types/userSignin";
import { notification } from "antd";


function  * createProjectSaga (action){
try {
    //call api
const {data, status} = yield call(()=>userService.createProjectAuthorization(action.newProject))
    notification.success({
        message: "create success"
    })
    const navigate = yield select(state=>state.navigateReducer.navigate)
    navigate("/projectManagement")


} catch (error) {
    console.log(error.response.data);
    notification.warning({
        message: 'create fail'
    })

}

}
export function * theoDoiCreateProjectSaga (){
    yield takeLatest("CREATE_PROJECT_SAGA", createProjectSaga)
}

function * getListProjectSaga(action){
    try {
        const {data, status} = yield call(()=> userService.getListProject())
        yield put ({
            type: "GET_LIST_PROJECT",
            projectList: data.content
        })
    } catch (error) {
        
    }
    }
    
    
    
    
    
    
    export function * theoDoiGetListProjectSaga(){
        yield takeLatest("GET_LIST_PROJECT_SAGA", getListProjectSaga)
       
    }
//update

function  * updateProjectSaga (action){
    try {
        //call api
    const {data, status} = yield call(()=>userService.updateProject(action.projectUpdate))
        
    notification.success({
            message: "update success"
        })
        yield put ({
            type: "GET_LIST_PROJECT_SAGA"
        })
        yield put ({
            type : "CLOSE_MODAL"
        })
    
    
    
    } catch (error) {
        console.log(error.response.data);
        notification.warning({
            message: `update fail!!!  ${error.response.data.content}`
        })
    
    }
    
    }
    export function * theoDoiUpdateProjectSaga (){
        yield takeLatest("UPDATE_PROJECT_SAGA", updateProjectSaga)
    }

 //delete
 function  * deleteProjectSaga (action){
    try {
        //call api
    const {data, status} = yield call(()=>userService.deleteProject(action.idProject))
        
    notification.success({
            message: "Delete success"
        })
        yield put ({
            type: "GET_LIST_PROJECT_SAGA"
        })
       
    
    
    
    } catch (error) {
        console.log(error.response.data);
        notification.warning({
            message: `update fail!!!  ${error.response.data.content}`
        })
    
    }
    
    }
    export function * theoDoiDeleteProjectSaga (){
        yield takeLatest("DELETE_PROJECT_SAGA", deleteProjectSaga)
    }   
 //get project detail
 function  * getProjectDetailSaga (action){
    try {
        //call api
    const {data, status} = yield call(()=>userService.getProjectDetail(action.projectId))
        yield put({
            type: "PUT_PROJECT_DETAIL",
            projectDetail: data.content,
        })
   
    } catch (error) {
        console.log(error.response.data);
      
    
    }
    
    }
    export function * theoDoiGetProjectDetail (){
        yield takeLatest("GET_PROJECT_DETAIL", getProjectDetailSaga)
    }   
