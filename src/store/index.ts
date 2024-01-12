import { configureStore } from '@reduxjs/toolkit';
import psyAnswerSheetSlice from 'src/features/psyAnswerSheetSlice';
import psyResultSlice from 'src/features/psyResultSlice';
import psyUserInfoSlice from 'src/features/psyUserInfoSlice';

export const store = configureStore({
  reducer: {
    psyAnswerSheet: psyAnswerSheetSlice,
    psyResult: psyResultSlice,
    psyUserInfo: psyUserInfoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
