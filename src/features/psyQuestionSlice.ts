import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PsyQuestionProps, QuestionDataProps } from "../types/psyQuestion";
import axios from "axios";

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

export const fetchQuestionData = createAsyncThunk(
    FETCH_QUESTION_DATA_REQUEST,
    async (_, thunkAPI) => {
        return axios
            .get(
                `${process.env.REACT_APP_CAREER_PSY_QUESTION_ENDPOINT}?apikey=${process.env.REACT_APP_API_KEY}&q=6`
            )
            .then(res => ({ data: res.data.RESULT }))
            .catch(error => thunkAPI.rejectWithValue({ errorMessage: error.message }));
    }
);

const psyQuestionSlice = createSlice({
    name: "psy_question",
    initialState: INITIAL_STATE,
    reducers: {
        handlePrevPage(state) {
            if (state.pagination_data.offset !== 0) {
                state.pagination_data.offset =
                    state.pagination_data.offset - state.pagination_data.count;
            }
        },
        handleNextPage(state) {
            if (
                state.pagination_data.offset !==
                state.question_data.length -
                    (state.question_data.length % state.pagination_data.count)
            ) {
                state.pagination_data.offset =
                    state.pagination_data.offset + state.pagination_data.count;
            }
        },
        resetPage(state) {
            state.pagination_data = { count: 5, offset: 0 };
        }
    },
    extraReducers: {
        [fetchQuestionData.pending.type]: state => {
            state.loading = true;
        },
        [fetchQuestionData.fulfilled.type]: (
            state,
            action: PayloadAction<{ data: QuestionDataProps[] }>
        ) => {
            state.loading = false;
            state.question_data = action.payload.data;
        },
        [fetchQuestionData.rejected.type]: (
            state,
            action: PayloadAction<{ errorMessage: string }>
        ) => {
            state.loading = false;
            state.question_data = [];
            state.error = action.payload.errorMessage;
        }
    }
});

export const { handleNextPage, handlePrevPage, resetPage } = psyQuestionSlice.actions;
export default psyQuestionSlice.reducer;
