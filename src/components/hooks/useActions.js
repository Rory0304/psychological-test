import { useDispatch } from "react-redux";
import { setResultAnswer } from "../../reducers/qaReducer";
import {
    fetchScoreData,
    fetchJobDataByEducation,
    fetchJobDataByMajor
} from "../../reducers/resultReducer";

function useActions() {
    const dispatch = useDispatch();

    /* 검사지 데이터(가치관 점수, 직업군)를 설정함 */
    const setResultData = () => {
        dispatch(setResultAnswer()).then(() => {
            dispatch(fetchScoreData()).then(() => {
                dispatch(fetchJobDataByEducation());
                dispatch(fetchJobDataByMajor());
            });
        });
    };

    return { setResultData };
}

export default useActions;
