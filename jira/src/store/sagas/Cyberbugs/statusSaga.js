import { call, put, takeLatest } from "redux-saga/effects";
import { statusService } from "../../../services/statusService";

function * getAllStatusSaga (action) {
   
    try {
        const {data, status} = yield call(()=>statusService.getAllStatus());

        yield put ({
            type: "GET_ALL_STATUS",
            arrStatus: data.content
        })
    } catch (error) {
        console.log(error);
    }
}

export function * theoDoiGetAllStatusSaga(){
   yield takeLatest("GET_ALL_STATUS_SAGA",getAllStatusSaga )
}