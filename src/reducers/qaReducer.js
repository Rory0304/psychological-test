import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    answer_sheet: {
        apikey: process.env.REACT_APP_API_KEY,
        qestrnSeq: "6", //심리 검사 번호
        trgetSe: "100209",
        name: "",
        gender: "",
        grade: "",
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

export const setResultAnswer = createAsyncThunk("SET_RESULT_ANSWER", async (args, ThunkAPI) => {
    const { qaData } = ThunkAPI.getState();
    const answerResult = qaData.pre_answers
        .map(data => {
            return `B${data.qitemNo}=${data.answer}`;
        })
        .join(" ");
    return answerResult;
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
        handlePrevPage(state) {
            /* 첫 페이지일 경우 next page state에 변화를 주지 않는다. */
            if (state.pagination_data.offset !== 0) {
                state.pagination_data.offset =
                    state.pagination_data.offset - state.pagination_data.limit;
            }
        },
        handleNextPage(state) {
            /* 마지막 페이지일 경우 prev stage state에 변화를 주지 않는다. */
            if (
                state.pagination_data.offset !==
                state.question_data.length -
                    (state.question_data.length % state.pagination_data.limit)
            ) {
                state.pagination_data.offset =
                    state.pagination_data.offset + state.pagination_data.limit;
            }
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

        builder.addCase(setResultAnswer.fulfilled, (state, action) => {
            state.answer_sheet.answers = action.payload;
        });
    }
});

export const { inputUserInfo, inputAnswer, resetState, handlePrevPage, handleNextPage } =
    qaDataSlice.actions;

export default qaDataSlice;
