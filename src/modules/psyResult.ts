import { PsyResultProps } from "../types/psyResult";
import { JOB_VALUES, EDU_INFO_LIST, MAJOR_INFO_LIST } from "../constants/psyResult";
import axios from "axios";
import { produce } from "immer";
import type { PsyAnswerSheetType } from "src/types/psyAnswerSheet";
import type { RootState } from "src/store";

import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { PsyUserInfoProps } from "src/types/psyUserInfo";

//
// Initial Data structure
// - loading: 로딩
// - score_data: 점수 데이터
// - jobdata_edu: edu 관련 직업군
// - jobdata_major: 전공 관련 직업군
// - no1:
// - no2:
// - bestTwo:
// - worstTwo:
// - error: 에러 메세지
//
const INITIAL_STATE: PsyResultProps = {
    loading: false,
    score_data: [],
    jobdata_edu: [],
    jobdata_major: [],
    no1: "",
    no2: "",
    bestTwo: ["", ""],
    worstTwo: ["", ""],
    error: ""
};

//
// Action Type
//
const FETCH_SCORE_REQUEST = "psy_result/FETCH_SCORE_REQUEST" as const;
const FETCH_SCORE_SUCCESS = "psy_result/FETCH_SCORE_SUCCESS" as const;
const FETCH_SCORE_ERROR = "psy_result/FETCH_SCORE_ERROR" as const;

const FETCH_JOBDATA_EDU_REQUEST = "psy_result/FETCH_JOBDATA_EDU_REQUEST" as const;
const FETCH_JOBDATA_EDU_SUCCESS = "psy_result/FETCH_JOBDATA_EDU_SUCCESS" as const;
const FETCH_JOBDATA_EDU_ERROR = "psy_result/FETCH_JOBDATA_EDU_ERROR" as const;

const FETCH_JOBDATA_MAJOR_REQUEST = "psy_result/FETCH_JOBDATA_MAJOR_REQUEST" as const;
const FETCH_JOBDATA_MAJOR_SUCCESS = "psy_result/FETCH_JOBDATA_MAJOR_SUCCESS" as const;
const FETCH_JOBDATA_MAJOR_ERROR = "psy_result/FETCH_JOBDATA_MAJOR_ERROR" as const;

//
// Action Creator
//
const fetchScoreRequest = () => ({
    type: FETCH_SCORE_REQUEST
});
const fetchScoreSuccess = (data: any[]) => ({ type: FETCH_SCORE_SUCCESS, payload: { data } });
const fetchScoreError = (errorMessage: string) => ({
    type: FETCH_SCORE_ERROR,
    payload: { errorMessage }
});

//
const fetchJobDataEduRequest = () => ({
    type: FETCH_JOBDATA_EDU_REQUEST
});
const fetchJobDataEduSuccess = (data: any[]) => ({
    type: FETCH_JOBDATA_EDU_SUCCESS,
    payload: { data }
});
const fetchJobDataEduError = (errorMessage: string) => ({
    type: FETCH_JOBDATA_EDU_ERROR,
    payload: { errorMessage }
});

//
const fetchJobDataMajorRequest = () => ({
    type: FETCH_JOBDATA_MAJOR_REQUEST
});
const fetchJobDataMajorSuccess = (data: any[]) => ({
    type: FETCH_JOBDATA_MAJOR_SUCCESS,
    payload: { data }
});
const fetchJobDataMajorError = (errorMessage: string) => ({
    type: FETCH_JOBDATA_MAJOR_ERROR,
    payload: { errorMessage }
});

/*
 * 질문 별 답변에 대한 점수 계산
 * ref: https://www.career.go.kr/cnet/front/openapi/openApiTestCenter.do
 */
export const fetchScoreData = (
    userData: PsyUserInfoProps,
    answerData: PsyAnswerSheetType
): ThunkAction<void, RootState, unknown, AnyAction> => {
    return dispatch => {
        dispatch({ type: FETCH_SCORE_REQUEST });

        axios
            .post(`${process.env.REACT_APP_CAREER_PSY_REPORT_TEST_ENDPOINT}`, {
                apikey: process.env.REACT_APP_API_KEY,
                qestrnSeq: answerData.qestrnSeq,
                trgetSe: answerData.trgetSe,
                name: userData.name,
                gender: userData.gender === "male" ? "100323" : "100324",
                grade: "",
                email: "",
                startDtm: userData.startDtm,
                answers: answerData.answer_sheet
                    .map(data => {
                        return `B${data.qitemNo}=${data.answer}`;
                    })
                    .join(" ")
            })
            .then(async res => {
                const seq = res.data.RESULT.url.split("seq=")[1];
                await axios
                    .get(`${process.env.REACT_APP_CAREER_PSY_REPORT_ENDPOINT}?seq=${seq}`)
                    .then(res =>
                        dispatch({
                            type: FETCH_SCORE_SUCCESS,
                            payload: { data: res.data.result.wonScore.split(" ") }
                        })
                    );
            })
            .catch(error => {
                dispatch({
                    type: FETCH_SCORE_ERROR,
                    payload: { errorMessage: error.message }
                });
            });
    };
};

/**
 * 종사자 평균 학력별 직업 정보 요청
 * ref: https://www.career.go.kr/cnet/front/openapi/openApiTestCenter.do
 */
export const fetchJobDataByEducation = (
    no1: string,
    no2: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
    return dispatch => {
        dispatch({ type: FETCH_JOBDATA_EDU_REQUEST });

        axios
            .post(
                `${process.env.REACT_APP_CAREER_PSY_MAJOR_JOBS_ENDPOINT}/majors?no1=${no1}&no2=${no2}`
            )
            .then(res => {
                dispatch({ type: FETCH_JOBDATA_EDU_SUCCESS, payload: { data: res.data } });
            })
            .catch(error => {
                dispatch({
                    type: FETCH_JOBDATA_EDU_ERROR,
                    payload: { errorMessage: error.message }
                });
            });
    };
};

/**
 * 종사자 평균 전공별 직업 정보 요청
 * ref: https://www.career.go.kr/cnet/front/openapi/openApiTestCenter.do
 */
export const fetchJobDataByMajor = (
    no1: string,
    no2: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
    return dispatch => {
        dispatch({ type: FETCH_JOBDATA_MAJOR_REQUEST });

        axios
            .post(
                `${process.env.REACT_APP_CAREER_PSY_MAJOR_JOBS_ENDPOINT}/jobs?no1=${no1}&no2=${no2}`
            )
            .then(res => {
                dispatch({ type: FETCH_JOBDATA_MAJOR_SUCCESS, payload: { data: res.data } });
            })
            .catch(error => {
                dispatch({
                    type: FETCH_JOBDATA_MAJOR_ERROR,
                    payload: { errorMessage: error.message }
                });
            });
    };
};

//
//
//
type PsyResultType =
    | ReturnType<typeof fetchJobDataEduRequest>
    | ReturnType<typeof fetchJobDataEduSuccess>
    | ReturnType<typeof fetchJobDataEduError>
    | ReturnType<typeof fetchScoreRequest>
    | ReturnType<typeof fetchScoreSuccess>
    | ReturnType<typeof fetchScoreError>
    | ReturnType<typeof fetchJobDataMajorRequest>
    | ReturnType<typeof fetchJobDataMajorSuccess>
    | ReturnType<typeof fetchJobDataMajorError>;

//
//
//
const reducer = (state: PsyResultProps = INITIAL_STATE, action: PsyResultType) => {
    switch (action.type) {
        case "psy_result/FETCH_JOBDATA_EDU_REQUEST":
            return { ...state, loading: true };

        case "psy_result/FETCH_JOBDATA_EDU_SUCCESS":
            return produce(state, draft => {
                draft.jobdata_edu = EDU_INFO_LIST.map(edudata => {
                    let jobListByEdu: any[] = [];
                    action.payload.data.forEach(jobdata => {
                        if (jobdata[2] === edudata.key) {
                            jobListByEdu.push(jobdata[1]);
                        }
                    });
                    const newEduData = Object.assign(edudata, { jobs: jobListByEdu.join(", ") });
                    return newEduData;
                });

                draft.loading = false;
                draft.error = "";
            });

        case "psy_result/FETCH_JOBDATA_EDU_ERROR":
            return { ...state, loading: false, error: action.payload.errorMessage };

        case "psy_result/FETCH_JOBDATA_MAJOR_REQUEST":
            return { ...state, loading: true };

        case "psy_result/FETCH_JOBDATA_MAJOR_SUCCESS":
            return produce(state, draft => {
                draft.jobdata_major = MAJOR_INFO_LIST.map(majordata => {
                    let jobListByMajor: any[] = [];
                    action.payload.data.forEach(jobdata => {
                        if (jobdata[2] === majordata.key) {
                            jobListByMajor.push(jobdata[1]);
                        }
                    });

                    const newMajorDatda = Object.assign(majordata, {
                        jobs: jobListByMajor.join(", ")
                    });
                    return newMajorDatda;
                });

                draft.loading = false;
            });

        case "psy_result/FETCH_JOBDATA_MAJOR_ERROR":
            return {
                ...state,
                loading: false,
                error: action.payload.errorMessage
            };

        case "psy_result/FETCH_SCORE_REQUEST":
            return { ...state, loading: true };

        case "psy_result/FETCH_SCORE_SUCCESS":
            return produce(state, draft => {
                action.payload.data.forEach((item, index) => {
                    const [key, value] = item.split("=");
                    if (key && value) {
                        draft.score_data.push({
                            key: key,
                            score: value,
                            jobValue: JOB_VALUES[index]
                        });
                    }
                });

                const orderedScoreData = draft.score_data.map(score => score);

                orderedScoreData.sort(function (prev, next) {
                    if (parseInt(prev.score) < parseInt(next.score)) {
                        return -1;
                    }
                    if (parseInt(prev.score) > parseInt(next.score)) {
                        return 1;
                    }
                    return 0;
                });

                draft.no1 = orderedScoreData[orderedScoreData.length - 1].key;
                draft.no2 = orderedScoreData[orderedScoreData.length - 2].key;

                draft.bestTwo = [
                    orderedScoreData[orderedScoreData.length - 1].jobValue,
                    orderedScoreData[orderedScoreData.length - 2].jobValue
                ];

                draft.worstTwo = [orderedScoreData[0].jobValue, orderedScoreData[1].jobValue];
                draft.loading = false;
                draft.error = "";
            });

        case "psy_result/FETCH_SCORE_ERROR":
            return { ...INITIAL_STATE, loading: false, error: action.payload.errorMessage };

        default:
            return state;
    }
};

export default reducer;
