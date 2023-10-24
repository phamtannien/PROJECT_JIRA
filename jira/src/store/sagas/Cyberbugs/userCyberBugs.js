import axios from "axios";
import {call, delay, fork, take, takeEvery, takeLatest, put, select} from "redux-saga/effects"
import { USER_LOGIN_TYPE, USER_SIGNIN_API } from "../../types/userSignin";
import { userService } from "../../../services/userService";
import { notification } from "antd";
import { TOKEN, USER_LOGIN } from "../../../constants/api";

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
        navigate("/home")
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