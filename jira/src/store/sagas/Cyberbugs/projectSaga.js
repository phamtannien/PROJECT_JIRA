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



} catch (error) {
    console.log(error.response.data);
    notification.warning({
        message: 'create fail'
    })

}

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
        yield takeLatest("CREATE_PROJECT_SAGA", createProjectSaga)
    }