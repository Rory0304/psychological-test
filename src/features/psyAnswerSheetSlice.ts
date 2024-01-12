import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  PsyAnswerSheetItemType,
  PsyAnswerSheetType,
} from '../types/psyAnswerSheet';

//
//
//
const INITIAL_STATE: PsyAnswerSheetType = {
  qestrnSeq: '6', //심리 검사 번호
  trgetSe: '100209',
  answer_sheet: [] as PsyAnswerSheetItemType[],
};

//
//
//
const psyAnswerSheetSlice = createSlice({
  name: 'psy_answersheet',
  initialState: INITIAL_STATE,
  reducers: {
    setAnswerSheet(state, action: PayloadAction<{ total: number }>) {
      const total = action.payload.total;
      state.answer_sheet = Array(total);
    },
    setUserAnswer(
      state,
      action: PayloadAction<{ qitemNo: number; answer: string }>
    ) {
      const { qitemNo, answer } = action.payload;
      state.answer_sheet[qitemNo - 1] = { qitemNo, answer };
    },
    resetUserAnswer() {
      return INITIAL_STATE;
    },
  },
});

export const { setAnswerSheet, setUserAnswer, resetUserAnswer } =
  psyAnswerSheetSlice.actions;

export default psyAnswerSheetSlice.reducer;
