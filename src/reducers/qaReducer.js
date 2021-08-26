import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    answer_sheet: {
        apikey: process.env.REACT_APP_API_KEY,
        qestrnSeq: "6", //심리 검사 번호
        trgetSe: "100209", //직업 가치관 검사 대상 번호 ([todo] 추후 유저 정보를 구분해줄 것)
        name: "",
        gender: "",
        grade: "", //[todo] 일반 대상인데 grade 항목이 필수 조건인지 확인)
        email: "",
        startDtm: null,
        answers: ""
    },
    question_data: [],
    pre_answers: [],
    error: "",
    pagination_data: {
        limit: 5,
        offset: 0
    }
};

/* 질문 요청 */
export const fetchQuestionData = createAsyncThunk("FETCH_QUESTION_DATA", async () => {
    return await axios
        .get(
            `https://www.career.go.kr/inspct/openapi/test/questions?apikey=${process.env.REACT_APP_API_KEY}&q=6`
        )
        .then(data => data.data.RESULT)
        .catch(error => error);
});

/* slice */
const qaDataSlice = createSlice({
    name: "questionData",
    initialState,
    reducers: {
        inputUserInfo(state, action) {
            state.answer_sheet.name = action.payload.username;
            state.answer_sheet.gender = action.payload.gender === "male" ? "100323" : "100324";
            state.answer_sheet.startDtm = new Date().getTime();
        },
        resetState(state) {
            Object.assign(state, initialState);
        },
        inputAnswer(state, action) {
            //기존에 응답했는지 확인한다.
            const isAnswered = state.pre_answers.filter(
                pa => pa.qitemNo === action.payload.qitemNo
            );

            // 첫 응답이라면 pre_answers에 추가하고, 했으면 수정한다.
            if (isAnswered.length > 0) {
                state.pre_answers = state.pre_answers.map((pa, index) => {
                    if (pa.qitemNo === action.payload.qitemNo) {
                        let newPa = Object.assign({}, pa);
                        newPa.answer = action.payload.answer;
                        return newPa;
                    }
                    return pa;
                });
            } else {
                state.pre_answers.push({
                    qitemNo: action.payload.qitemNo,
                    answer: action.payload.answer
                });
            }
        },
        setResultAnswer(state) {
            const answerResult = state.pre_answers
                .map(data => {
                    return `B${data.qitemNo}=${data.answer}`;
                })
                .join(" ");
            state.answer_sheet.answers = answerResult;
        },
        handlePrevPage(state) {
            state.pagination_data.offset =
                state.pagination_data.offset - state.pagination_data.limit;
        },
        handleNextPage(state) {
            state.pagination_data.offset =
                state.pagination_data.offset + state.pagination_data.limit;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchQuestionData.pending, state => {
            state.loading = true;
            state.question_data = [];
            state.error = "";
        });
        builder.addCase(fetchQuestionData.fulfilled, (state, action) => {
            state.question_data = action.payload;
            state.loading = false;
            state.error = "";
        });
        builder.addCase(fetchQuestionData.rejected, (state, action) => {
            state.loading = false;
            state.question_data = [];
            state.error = action.payload;
        });
    }
});

export const {
    setResultAnswer,
    inputUserInfo,
    inputAnswer,
    resetState,
    handlePrevPage,
    handleNextPage
} = qaDataSlice.actions;

export default qaDataSlice;
