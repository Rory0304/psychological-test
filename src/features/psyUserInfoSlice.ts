import { PsyUserInfoProps } from "../types/psyUserInfo";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const INITIAL_STATE: PsyUserInfoProps = {
    name: "",
    gender: "male",
    grade: "",
    email: "",
    startDtm: null
};

//
//
//
const psyUserInfoSlice = createSlice({
    name: "psy_userInfo",
    initialState: INITIAL_STATE,
    reducers: {
        setUserInfo(
            state,
            action: PayloadAction<Partial<Pick<PsyUserInfoProps, "name" | "gender" | "startDtm">>>
        ) {
            state.name = action.payload.name ?? "";
            state.gender = action.payload.gender ?? "male";
            state.startDtm = new Date().getTime();
        },
        resetUserInfo() {
            return INITIAL_STATE;
        }
    }
});

export const { setUserInfo, resetUserInfo } = psyUserInfoSlice.actions;
export default psyUserInfoSlice.reducer;
