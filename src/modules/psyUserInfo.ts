import { PsyUserInfoProps } from "../types/psyUserInfo";

const INITIAL_STATE: PsyUserInfoProps = {
    name: "",
    gender: "male",
    grade: "",
    email: "",
    startDtm: null
};

//
// Action Type
//
const SET_USER_INFO = "psy_userInfo/SET_USER_INFO" as const;
const RESET_USER_INFO = "psy_userInfo/RESET_USER_INFO" as const;

//
// Action Creator
//
export const setUserInfo = (
    userInfo: Partial<Pick<PsyUserInfoProps, "name" | "gender" | "startDtm">>
) => ({
    type: SET_USER_INFO,
    payload: userInfo
});
export const resetUserInfo = () => ({ type: RESET_USER_INFO });

type PsyUserInfoActionType = ReturnType<typeof setUserInfo> | ReturnType<typeof resetUserInfo>;

//
//
//
const reducer = (state: PsyUserInfoProps = INITIAL_STATE, action: PsyUserInfoActionType) => {
    switch (action.type) {
        case SET_USER_INFO:
            return {
                ...state,
                name: action.payload.name ?? "",
                gender: action.payload.gender ?? "male",
                startDtm: new Date().getTime()
            };

        case RESET_USER_INFO:
            return INITIAL_STATE;

        default:
            return state;
    }
};

export default reducer;
