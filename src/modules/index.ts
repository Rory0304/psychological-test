import { combineReducers } from "redux";

import psyUserInfo from "./psyUserInfo";
import psyQuestion from "./psyQuestion";
import psyAnswerSheet from "./psyAnswerSheet";
import psyResult from "./psyResult";

const rootReducer = combineReducers({
    psyUserInfo,
    psyQuestion,
    psyAnswerSheet,
    psyResult
});

export default rootReducer;
