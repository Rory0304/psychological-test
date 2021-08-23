import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
    fetchScoreData,
    fetchJobDataByEducation,
    fetchJobDataByMajor
} from "../../reducers/resultReducer";
import { ViewResultButton, MoveToMainButton } from "../common/Button";

function ResultPaper() {
    const dispatch = useDispatch();
    const { loading, score_data, jobdata_edu, jobdata_major } = useSelector(
        state => state.resultData
    );

    useEffect(() => {
        async function getPsychologicalResult() {
            await dispatch(fetchScoreData());
            dispatch(fetchJobDataByEducation());
            dispatch(fetchJobDataByMajor());
        }
        getPsychologicalResult();
    }, []);

    if (loading && score_data && jobdata_edu && jobdata_major) {
        <div>loading...</div>;
    }
    return (
        <div>
            <h2>직업 가치관 결과</h2>
            {score_data.map((score, index) => (
                <p key={index}>
                    {score.jobValue} : {score.score}
                </p>
            ))}
            <h2>종사자 평균 전공별</h2>
            <table>
                <caption>종사자 평균 학력별 직업군</caption>
                <thead>
                    <tr>
                        <th scope="col">분야</th>
                        <th scope="col">직업</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>

            <h2>종사자 평균 전공별</h2>
            <table>
                <caption>종사자 평균 전공별 직업군</caption>
                <thead>
                    <tr>
                        <th scope="col">분야</th>
                        <th scope="col">직업</th>
                    </tr>
                </thead>
                <tbody>
                    {jobdata_major.map((md, index) => (
                        <tr key={index}>
                            <td>{md.major}</td>
                            <td>{md.jobs}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function ResultPage() {
    const [viewStatus, setViewStatus] = useState(false);

    return (
        <>
            <div>
                {viewStatus ? (
                    <>
                        <ResultPaper />
                        <Link to="/">
                            <MoveToMainButton>다시 검사하기</MoveToMainButton>
                        </Link>
                    </>
                ) : (
                    <>
                        <h1>검사가 완료되었습니다.</h1>
                        <p>
                            검사 결과는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게
                            생각하는지를 알려주고, 중요 가치를 충족시켜줄 수 있는 직업에 대해 생각해
                            볼 기회를 제공합니다.
                        </p>
                        <ViewResultButton type="button" onClick={() => setViewStatus(true)}>
                            결과 확인하기
                        </ViewResultButton>
                    </>
                )}
            </div>
        </>
    );
}

export default ResultPage;
