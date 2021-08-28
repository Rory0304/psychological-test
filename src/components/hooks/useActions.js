import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setResultAnswer } from "../../reducers/qaReducer";
import {
    fetchScoreData,
    fetchJobDataByEducation,
    fetchJobDataByMajor
} from "../../reducers/resultReducer";

function useActions() {
    const dispatch = useDispatch();

    /* 검사 점수 데이터를 설정함 (예시 페이지에서 사용) */
    const setResultPreview = useCallback(() => {
        dispatch(setResultAnswer()).then(() => {
            dispatch(fetchScoreData());
        });
    }, []);

    /* 검사지 데이터(가치관 점수, 직업군)를 설정함 */
    const setAllResultData = useCallback(() => {
        dispatch(fetchJobDataByEducation());
        dispatch(fetchJobDataByMajor());
    }, []);

    return { setAllResultData, setResultPreview };
}

export default useActions;
