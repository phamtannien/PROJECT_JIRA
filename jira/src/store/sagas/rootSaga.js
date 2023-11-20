import {all} from "redux-saga/effects"
import * as Cyberbugs from "./Cyberbugs/userCyberBugs"
import * as ProjectCategorySaga from "./Cyberbugs/projectCategorySaga"
import * as ProjectSaga from "./Cyberbugs/projectSaga"
import * as TaskTypeSaga from "./Cyberbugs/taskTypeSaga"
import * as Priority from "./Cyberbugs/prioritySaga"
import * as TaskSaga from "./Cyberbugs/taskSaga"
import * as StatusSaga from "./Cyberbugs/statusSaga"
export function * rootSaga(){
    yield all ([
        Cyberbugs.theoDoiSignin(),
        Cyberbugs.theoDoiGetUser(),
        Cyberbugs.theoDoiGetUserByProjectIdSaga(),
        Cyberbugs.theoDoiAddUserProject(),
        Cyberbugs.theoDoiRemoveUserProject(),
   
        ProjectCategorySaga.theoDoiGetAllProjectCategory(),
        ProjectSaga.theoDoiCreateProjectSaga(),
        ProjectSaga.theoDoiGetListProjectSaga(),
        ProjectSaga.theoDoiUpdateProjectSaga(),
        ProjectSaga.theoDoiDeleteProjectSaga(),
        ProjectSaga.theoDoiGetProjectDetail(),
        ProjectSaga.theoDoiGetAllProjectSaga(),
        TaskTypeSaga.theoDoiGetAllTaskTypeSaga(),
        Priority.theoDoiGetAllPrioritySaga(),
        TaskSaga.theoDoiCreateTaskSaga(),
        TaskSaga.theoDoiGetTaskDetailSaga(),
        TaskSaga.theoDoiUpdateTaskStatusSaga(),
        TaskSaga.theoDoiUpdateTaskSaga(),
        TaskSaga.theoDoiHandleChangePostApi(),
        StatusSaga.theoDoiGetAllStatusSaga(),
    ])
}
