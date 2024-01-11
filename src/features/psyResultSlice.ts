import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PsyAnswerSheetType } from 'src/types/psyAnswerSheet';
import { PsyUserInfoProps } from 'src/types/psyUserInfo';
import apiFetch from 'src/utils/apiFetch';

import {
  EDU_INFO_LIST,
  JOB_VALUES,
  MAJOR_INFO_LIST,
} from '../constants/psyResult';
import { PsyResultProps } from '../types/psyResult';

//
// Initial Data structure
// - loading: 로딩
// - score_data: 점수 데이터
// - jobdata_edu: edu 관련 직업군
// - jobdata_major: 전공 관련 직업군
// - no1:
// - no2:
// - bestTwo:
// - worstTwo:
// - error: 에러 메세지
//
const INITIAL_STATE: PsyResultProps = {
  loading: false,
  score_data: [],
  jobdata_edu: [],
  jobdata_major: [],
  no1: '',
  no2: '',
  bestTwo: ['', ''],
  worstTwo: ['', ''],
  error: '',
};

//
// Action Type
//
const FETCH_SCORE_REQUEST = 'psy_result/FETCH_SCORE_REQUEST' as const;

const FETCH_JOBDATA_EDU_REQUEST =
  'psy_result/FETCH_JOBDATA_EDU_REQUEST' as const;

const FETCH_JOBDATA_MAJOR_REQUEST =
  'psy_result/FETCH_JOBDATA_MAJOR_REQUEST' as const;

/*
 * 질문 별 답변에 대한 점수 계산
 * ref: https://www.career.go.kr/cnet/front/openapi/openApiTestCenter.do
 */
export const fetchScoreData = createAsyncThunk(
  FETCH_SCORE_REQUEST,
  async (
    {
      userData,
      answerData,
    }: { userData: PsyUserInfoProps; answerData: PsyAnswerSheetType },
    thunkAPI
  ) => {
    return await apiFetch<{ RESULT: { url: string } }>(
      `${process.env.REACT_APP_CAREER_PSY_REPORT_TEST_ENDPOINT}`,
      {
        method: 'POST',
        body: {
          apikey: process.env.REACT_APP_API_KEY,
          qestrnSeq: answerData.qestrnSeq,
          trgetSe: answerData.trgetSe,
          name: userData.name,
          gender: userData.gender === 'male' ? '100323' : '100324',
          grade: '',
          email: '',
          startDtm: userData.startDtm,
          answers: answerData.answer_sheet
            .map(data => {
              return `B${data.qitemNo}=${data.answer}`;
            })
            .join(' '),
        },
      }
    )
      .then(res => {
        const seq = res.RESULT.url.split('seq=')[1];
        return apiFetch<{ result: { wonScore: string } }>(
          `${process.env.REACT_APP_CAREER_PSY_REPORT_ENDPOINT}?seq=${seq}`
        ).then(res => ({ data: res.result.wonScore.split(' ') }));
      })
      .catch(error => {
        return thunkAPI.rejectWithValue({ errorMessage: error.message });
      });
  }
);

/**
 * 종사자 평균 학력별 직업 정보 요청
 * ref: https://www.career.go.kr/cnet/front/openapi/openApiTestCenter.do
 */
export const fetchJobDataByEducation = createAsyncThunk(
  FETCH_JOBDATA_EDU_REQUEST,
  async ({ no1, no2 }: { no1: string; no2: string }, thunkAPI) => {
    return await apiFetch<[number, string, number][]>(
      `${process.env.REACT_APP_CAREER_PSY_MAJOR_JOBS_ENDPOINT}/majors?no1=${no1}&no2=${no2}`,
      {
        method: 'POST',
      }
    )
      .then(res => ({ data: res }))
      .catch(error => {
        return thunkAPI.rejectWithValue({ errorMessage: error.message });
      });
  }
);

/**
 * 종사자 평균 전공별 직업 정보 요청
 * ref: https://www.career.go.kr/cnet/front/openapi/openApiTestCenter.do
 */
export const fetchJobDataByMajor = createAsyncThunk(
  FETCH_JOBDATA_MAJOR_REQUEST,
  async ({ no1, no2 }: { no1: string; no2: string }, thunkAPI) => {
    return await apiFetch<[number, string, number][]>(
      `${process.env.REACT_APP_CAREER_PSY_MAJOR_JOBS_ENDPOINT}/jobs?no1=${no1}&no2=${no2}`,
      {
        method: 'POST',
      }
    )
      .then(res => ({ data: res }))
      .catch(err => thunkAPI.rejectWithValue({ errorMessage: err.message }));
  }
);

//
//
//
const psyResultSlice = createSlice({
  name: 'psy_result',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: {
    [fetchScoreData.pending.type]: state => {
      state.loading = true;
    },
    [fetchScoreData.fulfilled.type]: (
      state,
      action: PayloadAction<{ data: string[] }>
    ) => {
      action.payload.data.forEach((item, index) => {
        const [key, value] = item.split('=');
        if (key && value) {
          state.score_data.push({
            key: key,
            score: value,
            jobValue: JOB_VALUES[index],
          });
        }
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

      state.no1 = orderedScoreData[orderedScoreData.length - 1].key;
      state.no2 = orderedScoreData[orderedScoreData.length - 2].key;

      state.bestTwo = [
        orderedScoreData[orderedScoreData.length - 1].jobValue,
        orderedScoreData[orderedScoreData.length - 2].jobValue,
      ];

      state.worstTwo = [
        orderedScoreData[0].jobValue,
        orderedScoreData[1].jobValue,
      ];
      state.loading = false;
      state.error = '';
    },
    [fetchScoreData.rejected.type]: (
      state,
      action: PayloadAction<{ errorMessage: string }>
    ) => {
      state.loading = false;
      state.error = action.payload.errorMessage;
    },
    [fetchJobDataByEducation.pending.type]: state => {
      state.loading = true;
    },
    [fetchJobDataByEducation.fulfilled.type]: (
      state,
      action: PayloadAction<{ data: [number, string, number][] }>
    ) => {
      state.jobdata_edu = EDU_INFO_LIST.map(edudata => {
        const jobListByEdu: string[] = [];
        action.payload.data.forEach(jobdata => {
          if (jobdata[2] === edudata.key) {
            jobListByEdu.push(jobdata[1]);
          }
        });
        const newEduData = Object.assign(edudata, {
          jobs: jobListByEdu.join(', '),
        });
        return newEduData;
      });

      state.loading = false;
      state.error = '';
    },
    [fetchJobDataByEducation.rejected.type]: (
      state,
      action: PayloadAction<{ errorMessage: string }>
    ) => {
      state.loading = false;
      state.error = action.payload.errorMessage;
    },
    [fetchJobDataByMajor.pending.type]: state => {
      state.loading = true;
    },
    [fetchJobDataByMajor.fulfilled.type]: (
      state,
      action: PayloadAction<{ data: [number, string, number][] }>
    ) => {
      state.jobdata_major = MAJOR_INFO_LIST.map(majordata => {
        const jobListByMajor: string[] = [];
        action.payload.data.forEach(jobdata => {
          if (jobdata[2] === majordata.key) {
            jobListByMajor.push(jobdata[1]);
          }
        });

        const newMajorDatda = Object.assign(majordata, {
          jobs: jobListByMajor.join(', '),
        });
        return newMajorDatda;
      });

      state.loading = false;
    },
    [fetchJobDataByMajor.rejected.type]: (
      state,
      action: PayloadAction<{ errorMessage: string }>
    ) => {
      state.loading = false;
      state.error = action.payload.errorMessage;
    },
  },
});

export default psyResultSlice.reducer;
