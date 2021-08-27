import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    score_data: [],
    jobdata_edu: [],
    jobdata_major: [],
    no1: "",
    no2: "",
    bestTwo: ["", ""],
    worstTwo: ["", ""],
    error: ""
};

/* 종사자 별 직업 정보를 얻기 위한 wonScore을 요청 */
export const fetchScoreData = createAsyncThunk("FETCH_SCORE_DATA", async (args, ThunkAPI) => {
    const { qaData } = ThunkAPI.getState();

    const result = await axios
        .post("https://www.career.go.kr/inspct/openapi/test/report", qaData.answer_sheet)
        .then(async res => {
            const seq = res.data.RESULT.url.split("seq=")[1];
            return await axios
                .get(`https://www.career.go.kr/inspct/api/psycho/report?seq=${seq}`)
                .then(res => res.data.result.wonScore.split(" "))
                .catch(error => error);
        });
    return result;
});

/* 종사자 평균 학력별 직업 정보 요청 */
export const fetchJobDataByEducation = createAsyncThunk(
    "FETCH_JOBDATA_EDU",
    async (args, ThunkAPI) => {
        const { resultData } = ThunkAPI.getState();
        return axios
            .get(
                `https://inspct.career.go.kr/inspct/api/psycho/value/jobs?no1=${resultData.no1}&no2=${resultData.no2}`
            )
            .then(res => res.data)
            .catch(err => err);
    }
);

/* 종사자 평균 전공별 직업 정보 요청 */
export const fetchJobDataByMajor = createAsyncThunk(
    "FETCH_JOBDATA_MAJOR",
    async (args, ThunkAPI) => {
        const { resultData } = ThunkAPI.getState();
        return axios
            .get(
                `https://inspct.career.go.kr/inspct/api/psycho/value/majors?no1=${resultData.no1}&no2=${resultData.no2}`
            )
            .then(res => res.data)
            .catch(err => err);
    }
);

const resultDataSlice = createSlice({
    name: "resultData",
    initialState,
    reducers: {},
    extraReducers: builder => {
        /* 직업 가치관 별로 answer score를 분류 */
        builder.addCase(fetchScoreData.pending, state => {
            state.loading = true;
            state.score_data = [];
            state.error = "";
        });
        builder.addCase(fetchScoreData.fulfilled, (state, action) => {
            const jobValues = [
                "능력발휘",
                "자율성",
                "보수",
                "안정성",
                "사회적 인정",
                "사회봉사",
                "자기계발",
                "창의성"
            ];
            action.payload.forEach((data, index) => {
                const [key, value] = data.split("=");
                state.score_data.push({ key: key, score: value, jobValue: jobValues[index] });
            });

            const orderedScoreData = state.score_data.map(score => score);

            orderedScoreData.sort(function (prev, next) {
                if (parseInt(prev.score) < parseInt(next.score)) {
                    return -1;
                }
                if (parseInt(prev.score) > parseInt(next.score)) {
                    return 1;
                }
                return 0;
            });

            state.no1 = orderedScoreData[orderedScoreData.length - 2].key;
            state.no2 = orderedScoreData[orderedScoreData.length - 3].key;

            state.bestTwo = [
                orderedScoreData[orderedScoreData.length - 2].jobValue,
                orderedScoreData[orderedScoreData.length - 3].jobValue
            ];

            state.worstTwo = [orderedScoreData[0].jobValue, orderedScoreData[1].jobValue];

            state.loading = false;
            state.error = "";
        });
        builder.addCase(fetchScoreData.rejected, (state, action) => {
            state.loading = false;
            state.score_data = [];
            state.error = action.payload;
        });

        builder.addCase(fetchJobDataByEducation.pending, state => {
            state.loading = true;
            state.jobdata_edu = [];
            state.error = "";
        });
        builder.addCase(fetchJobDataByEducation.fulfilled, (state, action) => {
            function groupJobsByEdu() {
                let eduList = [
                    { key: 1, edu: "중졸 이하" },
                    { key: 2, edu: "고졸" },
                    { key: 3, edu: "전문대졸" },
                    { key: 4, edu: "대졸" },
                    { key: 5, edu: "대학원졸" }
                ];

                const result = eduList.map(edudata => {
                    let jobListByEdu = [];
                    action.payload.forEach(jobdata => {
                        if (jobdata[2] === edudata.key) {
                            jobListByEdu.push(jobdata[1]);
                        }
                    });
                    edudata["jobs"] = jobListByEdu.join(", ");
                    return edudata;
                });
                return result;
            }
            state.jobdata_edu = groupJobsByEdu();
            state.loading = false;
            state.error = "";
        });
        builder.addCase(fetchJobDataByEducation.rejected, (state, action) => {
            state.loading = false;
            state.jobdata_edu = [];
            state.error = action.payload;
        });

        builder.addCase(fetchJobDataByMajor.pending, state => {
            state.loading = true;
            state.jobdata_major = [];
            state.error = "";
        });
        builder.addCase(fetchJobDataByMajor.fulfilled, (state, action) => {
            /* 전공 별로 직업군을 분류 */
            const groupJobsByMajor = () => {
                let majorList = [
                    { key: 0, major: "계열무관" },
                    { key: 1, major: "인문" },
                    { key: 2, major: "사회" },
                    { key: 3, major: "교육" },
                    { key: 4, major: "공학" },
                    { key: 5, major: "자연" },
                    { key: 6, major: "의학" },
                    { key: 7, major: "예체능" }
                ];
                const result = majorList.map(majordata => {
                    let jobListByMajor = [];
                    action.payload.forEach(jobdata => {
                        if (jobdata[2] === majordata.key) {
                            jobListByMajor.push(jobdata[1]);
                        }
                    });
                    majordata["jobs"] = jobListByMajor.join(", ");
                    return majordata;
                });
                return result;
            };

            state.jobdata_major = groupJobsByMajor();
            state.loading = false;
            state.error = "";
        });
        builder.addCase(fetchJobDataByMajor.rejected, (state, action) => {
            state.loading = false;
            state.jobdata_major = [];
            state.error = action.payload;
        });
    }
});

export default resultDataSlice;
