import {call, put, takeLatest} from "redux-saga/effects"
import { taskService } from "../../../services/taskService";
import { notification } from "antd";
import { CREATE_TASK_SAGA } from "../../../constants/taskConstant";
import { CLOSE_MODAL } from "../../../constants/modalConstant";




function * createTaskSaga(action){
    try {
        const {data, status} = yield call(()=> taskService.createTask(action.taskObject))
        notification.success({
            message: "Create successfully"
        })
        yield put ({
            type : CLOSE_MODAL
        })
    } catch (error) {
        console.log(error);
    }
}
export function * theoDoiCreateTaskSaga(){
    yield takeLatest(CREATE_TASK_SAGA,createTaskSaga )
}