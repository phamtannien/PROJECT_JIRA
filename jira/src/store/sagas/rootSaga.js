import {all} from "redux-saga/effects"
import * as Cyberbugs from "./Cyberbugs/userCyberBugs"
import * as ProjectCategorySaga from "./Cyberbugs/projectCategorySaga"
import * as ProjectSaga from "./Cyberbugs/projectSaga"
export function * rootSaga(){
    yield all ([
        Cyberbugs.theoDoiSignin(),
        Cyberbugs.theoDoiGetUser(),
        Cyberbugs.theoDoiAddUserProject(),
        Cyberbugs.theoDoiRemoveUserProject(),
        ProjectCategorySaga.theoDoiGetAllProjectCategory(),
        ProjectSaga.theoDoiCreateProjectSaga(),
        ProjectSaga.theoDoiGetListProjectSaga(),
        ProjectSaga.theoDoiUpdateProjectSaga(),
        ProjectSaga.theoDoiDeleteProjectSaga(),
        ProjectSaga.theoDoiGetProjectDetail(),

    ])
}
