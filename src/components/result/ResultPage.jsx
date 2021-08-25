import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import {
    fetchScoreData,
    fetchJobDataByEducation,
    fetchJobDataByMajor
} from "../../reducers/resultReducer";
import { ViewResultButton, MoveToMainButton } from "../common/Button";

import "./ResultPage.css";

function UserInfo() {
    const { name, gender, startDtm } = useSelector(state => state.qaData.answer_sheet);

    return (
        <ResultContent>
            <table>
                <caption className="visually-hidden">검사자 정보</caption>
                <thead>
                    <tr>
                        <th scope="col">이름</th>
                        <th scope="col">성별</th>
                        <th scope="col">검사일</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{name}</td>
                        <td>{gender === "100323" ? "남성" : "여성"}</td>
                        <td>{new Date(startDtm).toLocaleDateString()}</td>
                    </tr>
                </tbody>
            </table>
        </ResultContent>
    );
}
function ValueGraph({ score_data }) {
    const VerticalGraph = styled.div`
        display: flex;
        flex-direction: row-reverse;
        height: 500px;
        align-items: flex-end;
        justify-content: space-around;
        flex-direction: row;
    `;

    const VerticalBar = styled.div`
        width: 12%;
        position: relative;
        background-color: #345bcd;
        height: ${props => props.height};
    `;

    const BarLabel = styled.div`
        width: 100%;
        background-color: #eaeaea;
        position: absolute;
        bottom: 0;
        text-align: center;
    `;
    return (
        <ResultContent>
            <h2>직업 가치관 결과</h2>
            <VerticalGraph>
                {score_data.map(
                    (score, index) =>
                        score.score && (
                            <VerticalBar key={index} height={`${(score.score / 5) * 100}%`}>
                                <BarLabel>{score.jobValue}</BarLabel>
                            </VerticalBar>
                        )
                )}
            </VerticalGraph>
        </ResultContent>
    );
}

function EduTable({ jobdata_edu }) {
    return (
        <section>
            <h3>종사자 평균 학력별</h3>
            <table>
                <caption className="visually-hidden">종사자 평균 학력별 직업군</caption>
                <thead>
                    <tr>
                        <th scope="col">분야</th>
                        <th scope="col">직업</th>
                    </tr>
                </thead>
                <tbody>
                    {jobdata_edu.map(
                        (ed, index) =>
                            ed.jobs && (
                                <tr key={index}>
                                    <td>{ed.edu}</td>
                                    <td>{ed.jobs}</td>
                                </tr>
                            )
                    )}
                </tbody>
            </table>
        </section>
    );
}

function MajorTable({ jobdata_major }) {
    return (
        <section>
            <h3>종사자 평균 전공별</h3>
            <table>
                <caption className="visually-hidden">종사자 평균 전공별 직업군</caption>
                <thead>
                    <tr>
                        <th scope="col">분야</th>
                        <th scope="col">직업</th>
                    </tr>
                </thead>
                <tbody>
                    {jobdata_major.map(
                        (md, index) =>
                            md.jobs && (
                                <tr key={index}>
                                    <td>{md.major}</td>
                                    <td>{md.jobs}</td>
                                </tr>
                            )
                    )}
                </tbody>
            </table>
        </section>
    );
}
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
        <>
            <hedaer>
                <h1>직업 가치관 검사 결과표</h1>
            </hedaer>
            <main>
                <UserInfo />
                <ValueGraph score_data={score_data} />
                <ResultContent>
                    <h2>가치관과 관련이 높은 직업</h2>
                    <EduTable jobdata_edu={jobdata_edu} />
                    <MajorTable jobdata_major={jobdata_major} />
                </ResultContent>
            </main>
        </>
    );
}

function ResultPage() {
    const [viewStatus, setViewStatus] = useState(false);

    return (
        <div className="result-wrapper">
            {viewStatus ? (
                <>
                    <ResultPaper />
                    <Link to="/" className="goto-main">
                        <MoveToMainButton>다시 검사하기</MoveToMainButton>
                    </Link>
                </>
            ) : (
                <>
                    <h1>검사가 완료되었습니다.</h1>
                    <p>
                        검사 결과는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게
                        생각하는지를 알려주고, 중요 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼
                        기회를 제공합니다.
                    </p>
                    <ViewResultButton type="button" onClick={() => setViewStatus(true)}>
                        결과 확인하기
                    </ViewResultButton>
                </>
            )}
        </div>
    );
}

export const ResultContent = styled.div`
    margin-bottom: 20px;
`;

export default ResultPage;
