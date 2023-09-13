import { produce } from "immer";
import { PsyAnswerSheetType, PsyAnswerSheetItemType } from "../types/psyAnswerSheet";
import { ActionType, createAction, createReducer } from "typesafe-actions";

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

export const setAnswerSheet = createAction(SET_ANSWER_SHEET, ({ total }: { total: number }) => ({
    total
}))();
export const setUserAnswer = createAction(
    SET_USER_ANSWER,
    ({ qitemNo, answer }: { qitemNo: number; answer: string }) => ({
        qitemNo,
        answer
    })
)();
export const resetUserAnswer = createAction(RESET_USER_ANSWER)();

const actions = { setAnswerSheet, setUserAnswer, resetUserAnswer };
export type PsyAnswerSheetActionTypes = ActionType<typeof actions>;

//
//
//
const reducer = createReducer<PsyAnswerSheetType, PsyAnswerSheetActionTypes>(INITIAL_STATE, {
    [SET_ANSWER_SHEET]: (state, action) => {
        const total = action.payload.total;
        return {
            ...state,
            answer_sheet: Array(total)
        };
    },
    [SET_USER_ANSWER]: (state, action) => {
        const { qitemNo, answer } = action.payload;

        return produce(state, draft => {
            draft.answer_sheet[qitemNo - 1] = { qitemNo, answer };
        });
    },
    [RESET_USER_ANSWER]: () => INITIAL_STATE
});

export default reducer;
