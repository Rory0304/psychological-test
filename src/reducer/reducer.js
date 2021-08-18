import {
    INPUT_USERINFO,
    SET_LOADING,
    INPUT_ANSWER,
    RESET_STATE
} from "./variables";

const initialState = {
    loading: false,
    answer_sheet: {
        apikey: process.env.REACT_APP_API_KEY,
        qestrnSeq: 6, //심리 검사 번호
        trgetSe: 100209, //직업 가치관 검사 대상 번호 ([todo] 추후 유저 정보를 구분해줄 것)
        name: "",
        gender: "",
        grade: "", //[todo] 일반 대상인데 grade 항목이 필수 조건인지 확인)
        email: "",
        startDtm: null,
        answers: ""
    },
    pre_answers: [] //작성 완료 버튼을 누른 후, answer_sheet의 answers에 string으로 변환
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case INPUT_USERINFO:
            const newAnswerSheet = Object.assign({}, state.answer_sheet);
            newAnswerSheet.name = action.payload.username;
            newAnswerSheet.gender =
                action.payload.gender === "male" ? 100323 : 100324;
            return {
                ...state,
                answer_sheet: newAnswerSheet
            };
        case SET_LOADING:
            return { ...state, loading: action.payload };
        case INPUT_ANSWER:
            //기존에 응답했는지 확인한다.
            const isAnswered = state.pre_answers.filter(
                pa => pa.qitemNo === action.payload.qitemNo
            );
            // 했으면 수정, 안 했으면 추가
            if (isAnswered.length > 0) {
                const newPreAnswer = state.pre_answers.map((pa, index) => {
                    if (pa.qitemNo === action.payload.qitemNo) {
                        let newPa = Object.assign({}, pa);
                        newPa.answer = action.payload.answer;
                        return newPa;
                    }
                    return pa;
                });
                return { ...state, pre_answers: newPreAnswer };
            } else {
                const newPreAnswer = [
                    ...state.pre_answers,
                    {
                        qitemNo: action.payload.qitemNo,
                        answer: action.payload.answer
                    }
                ];
                return {
                    ...state,
                    pre_answers: newPreAnswer
                };
            }
        case RESET_STATE:
            return initialState;
        default:
            return state;
    }
};
