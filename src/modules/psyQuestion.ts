import { PsyQuestionProps, QuestionDataProps } from "../types/psyQuestion";
import axios from "axios";
import { produce } from "immer";

import type { RootState } from "src/store";

import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

//
// Initial Data structure
// - loading: 로딩
// - question_data: 질문지
// - error: 에러 메세지
// - pagination_data: 페이지네이션 정보
//
const INITIAL_STATE: PsyQuestionProps = {
    loading: false,
    qestrnSeq: "6", //심리 검사 번호,
    trgetSe: "100209",
    question_data: [],
    error: "",
    pagination_data: {
        count: 5,
        offset: 0
    }
};

//
// Action Type
//
const FETCH_QUESTION_DATA_REQUEST = "psy_question/FETCH_QUESTION_DATA_REQUEST" as const;
const FETCH_QUESTION_DATA_SUCCESS = "psy_question/FETCH_QUESTION_DATA_SUCCESS" as const;
const FETCH_QUESTION_DATA_ERROR = "psy_question/FETCH_QUESTION_DATA_ERROR" as const;

const HANDLE_NEXT_PAGE = "psy_question/HANDLE_NEXT_PAGE" as const;
const HANDLE_PREV_PAGE = "psy_question/HANDLE_PREV_PAGE" as const;
const RESET_PAGE = "psy_question/RESET_PAGE" as const;

//
// Action Creator
//
export const handleNextPage = () => ({ type: HANDLE_NEXT_PAGE });
export const handlePrevPage = () => ({ type: HANDLE_PREV_PAGE });
export const resetPage = () => ({ type: RESET_PAGE });

const fetchQuestionDataRequest = () => ({ type: FETCH_QUESTION_DATA_REQUEST });
const fetchQuestionDatatSuccess = (data: QuestionDataProps[]) => ({
    type: FETCH_QUESTION_DATA_SUCCESS,
    payload: { data }
});
const fetchQuestionDataError = (errorMessage: string) => ({
    type: FETCH_QUESTION_DATA_ERROR,
    payload: { errorMessage }
});

export const fetchQuestionData = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async dispatch => {
        dispatch({ type: FETCH_QUESTION_DATA_REQUEST });

        axios
            .get(
                `${process.env.REACT_APP_CAREER_PSY_QUESTION_ENDPOINT}?apikey=${process.env.REACT_APP_API_KEY}&q=6`
            )
            .then(res => {
                dispatch({ type: FETCH_QUESTION_DATA_SUCCESS, payload: { data: res.data.RESULT } });
            })
            .catch(error => {
                dispatch({
                    type: FETCH_QUESTION_DATA_ERROR,
                    payload: { errorMessage: error.message }
                });
            });
    };
};

//
//
//
type PsyQuestionType =
    | ReturnType<typeof handleNextPage>
    | ReturnType<typeof handlePrevPage>
    | ReturnType<typeof resetPage>
    | ReturnType<typeof fetchQuestionDataRequest>
    | ReturnType<typeof fetchQuestionDatatSuccess>
    | ReturnType<typeof fetchQuestionDataError>;

//
//
//
const reducer = (state: PsyQuestionProps = INITIAL_STATE, action: PsyQuestionType) => {
    switch (action.type) {
        case FETCH_QUESTION_DATA_REQUEST:
            return produce(state, draft => {
                draft.loading = true;
            });

        case FETCH_QUESTION_DATA_SUCCESS:
            return produce(state, draft => {
                draft.loading = false;
                draft.question_data = action.payload.data;
            });

        case FETCH_QUESTION_DATA_ERROR:
            return produce(state, draft => {
                draft.loading = false;
                draft.question_data = [];
                draft.error = action.payload.errorMessage;
            });

        case HANDLE_PREV_PAGE:
            return produce(state, draft => {
                if (draft.pagination_data.offset !== 0) {
                    draft.pagination_data.offset =
                        draft.pagination_data.offset - draft.pagination_data.count;
                }
            });

        case HANDLE_NEXT_PAGE:
            return produce(state, draft => {
                if (
                    draft.pagination_data.offset !==
                    draft.question_data.length -
                        (draft.question_data.length % draft.pagination_data.count)
                ) {
                    draft.pagination_data.offset =
                        draft.pagination_data.offset + draft.pagination_data.count;
                }
            });

        case RESET_PAGE:
            return {
                ...state,
                pagination_data: {
                    count: 5,
                    offset: 0
                }
            };
        default:
            return state;
    }
};

export default reducer;
