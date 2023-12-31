import { call, put, takeLatest } from "redux-saga/effects";
import { priorityService } from "../../../services/priorityService";
import { GET_ALL_PRIORITY, GET_ALL_PRIORITY_SAGA } from "../../../constants/priorityConstant";

function * getAllPrioritySaga(action){
    try {
        const {data, status} = yield call(()=> priorityService.getAllPriority())
        yield put({
            type: GET_ALL_PRIORITY,
            arrPriority: data.content
        })
    } catch (error) {
        console.log(error);
    }
}
export function * theoDoiGetAllPrioritySaga(){
    yield takeLatest(GET_ALL_PRIORITY_SAGA,getAllPrioritySaga )
}