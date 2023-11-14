import { userService } from "../../../services/userService";
import {call, delay, fork, take, takeEvery, takeLatest, put, select} from "redux-saga/effects"
import { GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_CATEGORY_SAGA } from "../../types/userSignin";
import { projectService } from "../../../services/projectService";


function  * getAllProjectCategorySaga (action){
try {
    //call api
const {data, status} = yield call(()=>projectService.getAllProjectCategory())
//dispatch
yield put ({
    type: GET_ALL_PROJECT_CATEGORY,
    data: data.content
})


} catch (error) {
    console.log(error.response.data);
}

}








export function * theoDoiGetAllProjectCategory(){
    yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategorySaga)
   
}