import {call, put, select, takeLatest} from "redux-saga/effects"
import { taskService } from "../../../services/taskService";
import { notification } from "antd";
import { CHANGE_ASSIGNESS, CHANGE_TASK_MODAL, CREATE_TASK_SAGA, GET_TASK_DETAIL, GET_TASK_DETAIL_SAGA, HANDLE_CHANGE_POST_API_SAGA, REMOVE_USER_ASIGNESS, UPDATE_STATUS_TASK_SAGA, UPDATE_TASK_SAGA } from "../../../constants/taskConstant";
import { CLOSE_MODAL } from "../../../constants/modalConstant";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../../constants/loadingConstant";
import { GET_USER_BY_PROJECT_ID } from "../../../constants/userConstants";
import { STATUS_CODE } from "../../../constants/api";
import { GET_PROJECT_DETAIL } from "../../../constants/projectConstant";




function * createTaskSaga(action){
    try {
        const {data, status} = yield call(()=> taskService.createTask(action.taskObject))
        notification.success({
            message: "Create successfully"
        })
        yield put ({
            type : CLOSE_MODAL,
           
        })
    } catch (error) {
        console.log(error);
    }
}
export function * theoDoiCreateTaskSaga(){
    yield takeLatest(CREATE_TASK_SAGA,createTaskSaga )
}
function * getTaskDetailSaga(action){
   const {taskId} = action
    try {
        const {data, status} = yield call(()=> taskService.getTaskDetail(taskId))
       
        yield put({
            type: GET_TASK_DETAIL,
            taskDetailModal: data.content
        })
     
    } catch (error) {
        console.log(error);
    }
}
export function * theoDoiGetTaskDetailSaga(action){
    yield takeLatest(GET_TASK_DETAIL_SAGA,getTaskDetailSaga )
}
//update task status

function * updateTaskStatusSaga(action){
    const {taskUpdateStatus} = action
     try {
         const {data, status} = yield call(()=> taskService.updateStatusTask(taskUpdateStatus))
        if(status == STATUS_CODE.SUCCESS){
            yield put({
                type: GET_PROJECT_DETAIL,
                projectId: taskUpdateStatus.projectId
            })
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: taskUpdateStatus.taskId
            })
        }
        
      
     } catch (error) {
         console.log(error);
     }
 }
 export function * theoDoiUpdateTaskStatusSaga(action){
     yield takeLatest(UPDATE_STATUS_TASK_SAGA,updateTaskStatusSaga )
 }
//update task 

function * updateTaskSaga(action){
    
 }
 export function * theoDoiUpdateTaskSaga(){
     yield takeLatest(UPDATE_TASK_SAGA,updateTaskSaga )
 }
 export function * handleChangePostApi (action){
//gọi action làm thay đổi task detail modal

switch (action.actionType) {
    case CHANGE_TASK_MODAL:{
        const {value, name} = action;
        yield put({
            type: CHANGE_TASK_MODAL,
            name,
            value
        });
    };
    break;
   case CHANGE_ASSIGNESS :{
    const {userSelected} = action;
    yield put({
        type: CHANGE_ASSIGNESS,
        userSelected
    });
   };
   break;
   case REMOVE_USER_ASIGNESS:{
    const {userId} = action;
    yield put ({
        type: REMOVE_USER_ASIGNESS,
        userId
    })
   };
   break;
}

//lưu lại sự thay đổi
    let {taskDetailModal} = yield select(state => state.taskReducer);
    const listUserAsign = taskDetailModal.assigness?.map((user, index)=>{
        return user.id
    })
    const taskUpdateApi = {...taskDetailModal, listUserAsign}
    try {
    const {status, data} = yield call(()=>taskService.updateTask(taskUpdateApi))
    if(status == STATUS_CODE.SUCCESS){
        yield put({
            type: GET_PROJECT_DETAIL,
            projectId: taskUpdateApi.projectId
        })
        yield put({
            type: GET_TASK_DETAIL_SAGA,
            taskId: taskUpdateApi.taskId
        })
    }
}catch(err){
console.log(err.response?.data);
console.log(err);
}  
 }
 export function * theoDoiHandleChangePostApi(){
    yield takeLatest(HANDLE_CHANGE_POST_API_SAGA,handleChangePostApi )
}