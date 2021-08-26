import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import {
    fetchScoreData,
    fetchJobDataByEducation,
    fetchJobDataByMajor
} from "../../reducers/resultReducer";

import { UserInfo, MajorTable, EduTable } from "./Table";
import ValueGraph from "./ValueGraph";
import { ViewResultButton, MoveToMainButton } from "../common/Button";

function ResultPage() {
    const [viewStatus, setViewStatus] = useState(false);

    return (
        <ResultWrapper>
            {viewStatus ? (
                <>
                    <ResultPaper />
                    <Link to="/" className="goto-main">
                        <MoveToMainButton>다시 검사하기</MoveToMainButton>
                    </Link>
                </>
            ) : (
                <ResultPreview setViewStatus={setViewStatus} />
            )}
        </ResultWrapper>
    );
}

function ResultPreview({ setViewStatus }) {
    return (
        <>
            <h1>검사가 완료되었습니다.</h1>
            <p>
                검사 결과는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게 생각하는지를
                알려주고, 중요 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼 기회를 제공합니다.
            </p>
            <ViewResultButton type="button" onClick={() => setViewStatus(true)}>
                결과 확인하기
            </ViewResultButton>
        </>
    );
}

function ResultPaper() {
    const dispatch = useDispatch();
    const { loading, score_data, jobdata_edu, jobdata_major } = useSelector(
        state => state.resultData
    );
    useEffect(() => {
        dispatch(fetchScoreData()).then(() => {
            dispatch(fetchJobDataByEducation());
            dispatch(fetchJobDataByMajor());
        });
    }, []);

    if (loading && (!score_data || !jobdata_edu || !jobdata_major)) {
        <div>loading...</div>;
    }

    return (
        <>
            <header>
                <h1>직업 가치관 검사 결과표</h1>
                <p>
                    직업가치관이란 직업을 선택할 때 영향을 끼치는 자신만의 믿음과 신념입니다. 따라서
                    여러분의 직업생활과 관련하여 포기하지 않는 무게중심의 역할을 한다고 볼 수
                    있습니다. 직업가치관검사는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를
                    중요하게 생각하는지를 알려줍니다. 또 한 본인이 가장 중요하게 생각하는 가치를
                    충족시켜줄 수 있는 직업에 대해 생각해 볼 기회를 제공합니다.
                </p>
                <UserInfo />
            </header>
            <main>
                <Section>
                    <h2>1. 직업 가치관 결과</h2>
                    <ValueGraph />
                </Section>
                <Section>
                    <h2>2. 가치관과 관련이 높은 직업</h2>
                    <EduTable />
                    <MajorTable />
                </Section>
            </main>
        </>
    );
}

const ResultWrapper = styled.div`
    width: calc(100% - 30px * 2);
    padding: 40px;
    margin: 0 auto;

    & > header > h1 {
        padding-bottom: 10px;
        border-bottom: 1px solid black;
        text-align: center;
    }
`;

const Section = styled.section`
    margin: 40px 0 65px 0;

    & > h2 {
        border-left: 12px solid#4F718F;
        padding: 12px;
        margin: 20px 0;
    }

    & > h3 {
        margin: 20px 0;
    }
`;

export default ResultPage;
