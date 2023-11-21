import axios from "axios";
import {call, delay, fork, take, takeEvery, takeLatest, put, select} from "redux-saga/effects"
import { ADD_USER_PROJECT_API, DELETE_USER_API, GET_USER_API, GET_USER_BY_PROJECT_ID, GET_USER_BY_PROJECT_ID_SAGA, GET_USER_SEARCH, REMOVE_USER_PROJECT_API, USER_LOGIN_TYPE, USER_SIGNIN_API } from "../../../constants/userConstants";
import { userService } from "../../../services/userService";
import { notification } from "antd";
import { STATUS_CODE, TOKEN, USER_LOGIN } from "../../../constants/api";
import { GET_LIST_PROJECT_SAGA } from "../../../constants/projectConstant";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../../constants/loadingConstant";

//quản lý các action saga

function * signinSaga(action){
    //gọi api
    try {
        const {data, status} = yield call(()=> userService.signinApi(action.userLogin) ) 
        notification.success({
            message: "Đăng nhập thành công!"
        })
        //lưu vào local
        localStorage.setItem(TOKEN, data.content.accessToken)
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content) )
        yield put ({
            type: USER_LOGIN_TYPE,
            userLogin: data.content
        })
        const navigate = yield select(state=>state.navigateReducer.navigate)
        navigate("/")
    } catch (error) {
        notification.warning({
            message: `Đăng nhập thất bại: ${error.response?.data.content}`
         })
        console.log(error.response.data);
    }
   
}

export function * theoDoiSignin(){
    yield takeLatest(USER_SIGNIN_API, signinSaga)
   
}



function* getUserSaga (action){


//call api
yield put({
    type: DISPLAY_LOADING
})
yield delay(300)
try {
    const {data, status} = yield call(()=>userService.getUser(action.keyWord))
    if(status === STATUS_CODE.SUCCESS){
        yield put({
            type: GET_USER_SEARCH,
            lstUserSearch: data.content
        })
    }
    
} catch (error) {
    console.log(error.response.data);
}
yield put ({
    type: HIDE_LOADING
})
}
export function* theoDoiGetUser(){
    yield takeLatest(GET_USER_API, getUserSaga)
}


//delete user
function* deleteUserSaga (action){



try {
    const {data, status} = yield call(()=>userService.deleteUser(action.userId))
    notification.success({
        message: "Delete success"
    })
    yield put({
        type: GET_USER_API,
        keyWord: ''
    })
} catch (error) {
    notification.warning({
        message: `delete fail!!!  ${error.response.data.content}`
    })
    console.log(error.response.data);
}
}
export function* theoDoiDeleteUser(){
    yield takeLatest(DELETE_USER_API, deleteUserSaga)
}

//add user to project
function* addUserProjectSaga (action){


    //call api
    try {
        const {data, status} = yield call(()=>userService.asignUserProject(action.userProject))
        yield put ({
            type: GET_LIST_PROJECT_SAGA
        })
    } catch (error) {
        notification.warning({
            message: `Thêm thất bại: ${error.response?.data.content}`
         })
        console.log(error.response.data);
    }
    }
    export function* theoDoiAddUserProject(){
        yield takeLatest(ADD_USER_PROJECT_API, addUserProjectSaga)
    }
//remove user to project
function* removeUserProjectSaga (action){


    //call api
    try {
        const {data, status} = yield call(()=>userService.deleteUserProject(action.userProject))
        notification.success({
            message: "Xóa thành công!"
        })
        yield put ({
            type: GET_LIST_PROJECT_SAGA
        })
    } catch (error) {
        notification.warning({
            message: `Thêm thất bại: ${error.response?.data.content}`
         })
        console.log(error.response.data);
    }
    }
    export function* theoDoiRemoveUserProject(){
        yield takeLatest(REMOVE_USER_PROJECT_API, removeUserProjectSaga)
    }

//get user by project
function* getUserByProjectSaga (action){
const {idProject} = action;
console.log("action", idProject);
try {
    const {data, status} = yield call(()=>userService.getUserByProjectId(idProject));
   console.log("data", data);
    if(status === STATUS_CODE.SUCCESS){
        yield put({
            type: GET_USER_BY_PROJECT_ID,
            arrUser: data.content
        })
    }
} catch (error) {
    console.log(error);
    if(error.response?.data.statusCode === STATUS_CODE.NOT_FOUND){
        yield put({
            type: GET_USER_BY_PROJECT_ID,
            arrUser: []
        })
    }
}
}
    export function* theoDoiGetUserByProjectIdSaga(){
        yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectSaga)
    }