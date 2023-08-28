import { produce } from "immer";
import { PsyAnswerSheetType, PsyAnswerSheetItemType } from "../types/psyAnswerSheet";

//
//
//
const INITIAL_STATE: PsyAnswerSheetType = {
    qestrnSeq: "6", //심리 검사 번호
    trgetSe: "100209",
    answer_sheet: [] as PsyAnswerSheetItemType[]
};

//
// Action Creator
//
const SET_ANSWER_SHEET = "psy_answer/SET_ANSWER_SHEET" as const;
const SET_USER_ANSWER = "psy_answer/SET_USER_ANSWER" as const;
const RESET_USER_ANSWER = "psy_answer/RESET_USER_ANSWER" as const;

export const setAnswerSheet = (payload: { total: number }) => ({
    type: SET_ANSWER_SHEET,
    payload: payload
});
export const setUserAnswer = (payload: { qitemNo: number; answer: string }) => ({
    type: SET_USER_ANSWER,
    payload: payload
});

export const resetUserAnswer = () => ({ type: RESET_USER_ANSWER });

//
//
//
type PsyAnswerSheetActionTypes =
    | ReturnType<typeof setAnswerSheet>
    | ReturnType<typeof setUserAnswer>
    | ReturnType<typeof resetUserAnswer>;

//
//
//
const reducer = (state: PsyAnswerSheetType = INITIAL_STATE, action: PsyAnswerSheetActionTypes) => {
    switch (action.type) {
        case SET_ANSWER_SHEET: {
            const total = action.payload.total;
            return {
                ...state,
                answer_sheet: Array(total)
            };
        }

        case SET_USER_ANSWER: {
            const { qitemNo, answer } = action.payload;

            return produce(state, draft => {
                draft.answer_sheet[qitemNo - 1] = { qitemNo, answer };
            });
        }

        case RESET_USER_ANSWER:{
            return INITIAL_STATE;
        }

        default:
            return state;
    }
};

export default reducer;
