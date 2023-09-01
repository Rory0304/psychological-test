import { combineReducers } from "redux";

import psyUserInfo from "./psyUserInfo";
import psyAnswerSheet from "./psyAnswerSheet";
import psyResult from "./psyResult";

const rootReducer = combineReducers({
    psyUserInfo,
    psyAnswerSheet,
    psyResult
});

export default rootReducer;
