import React from "react";

import { useAppSelector } from "src/hooks/useAppSelector";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Typography, Colors } from "src/styles";
import { UserInfoTable, EduTable, MajorTable } from "./Table";
import ValueGraph from "./ValueGraph";

import { fetchJobDataByEducation, fetchJobDataByMajor } from "src/modules/psyResult";

import PreviewPage from "./PreviewPage";

const ResultPage: React.FC = () => {
    const [resultView, setResultView] = React.useState<"result" | "preview">("preview");

    const handleResultPageShow = () => setResultView("result");

    return (
        <>
            {resultView === "preview" ? (
                <PreviewPage onResultPageShow={handleResultPageShow} />
            ) : (
                <ResultWrapper>
                    <ResultPaper />
                    <Link to="/" className="goto-main">
                        <MoveToMainButton>다시 검사하기</MoveToMainButton>
                    </Link>
                </ResultWrapper>
            )}
        </>
    );
};

/* 검사 결과 페이지 */
const ResultPaper: React.FC = () => {
    const { name, gender, startDtm } = useAppSelector(state => state.psyUserInfo);
    const { loading, score_data, jobdata_edu, jobdata_major } = useAppSelector(
        state => state.psyResult
    );
    const { no1, no2 } = useAppSelector(state => state.psyResult);

    React.useEffect(() => {
        fetchJobDataByMajor(no1, no2);
        fetchJobDataByEducation(no1, no2);
    }, [no1, no2]);

    if (
        loading &&
        (score_data.length === 0 || jobdata_edu.length === 0 || jobdata_major.length === 0)
    ) {
        <div>loading...</div>;
    }
    return (
        <>
            <ResultHeader>
                <h1>직업 가치관 검사 결과표</h1>
                <p>
                    직업가치관이란 직업을 선택할 때 영향을 끼치는 자신만의 믿음과 신념입니다. 따라서
                    여러분의 직업생활과 관련하여 포기하지 않는 무게중심의 역할을 한다고 볼 수
                    있습니다. 직업가치관검사는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를
                    중요하게 생각하는지를 알려줍니다. 또 한 본인이 가장 중요하게 생각하는 가치를
                    충족시켜줄 수 있는 직업에 대해 생각해 볼 기회를 제공합니다.
                </p>
                <UserInfoTable name={name} gender={gender} startDtm={startDtm} />
            </ResultHeader>
            <main>
                <Section>
                    <h2>1. 직업 가치관 결과</h2>
                    <ValueGraph />
                </Section>
                <Section>
                    <h2>2. 가치관과 관련이 높은 직업</h2>
                    <EduTable jobDataEdu={jobdata_edu} />
                    <MajorTable jobDataMajor={jobdata_major} />
                </Section>
            </main>
        </>
    );
};

const ResultWrapper = styled.div`
    width: 75%;
    padding: 60px 0;
    margin: 0 auto;
`;

const ResultHeader = styled.header`
    & > h1 {
        width: fit-content;
        margin: 0 auto;
        padding-bottom: 13px;
        border-bottom: 2px solid black;
        font-size: ${Typography.big};
        font-weight: bold;
        text-align: center;
    }

    & > p {
        padding: 15px 5px;
        font-size: ${Typography.middle2};
        line-height: 32px;
        word-break: break-all;
    }
`;

const Section = styled.section`
    margin: 40px 0 65px 0;

    & > h2 {
        border-left: 12px solid ${Colors.mainBlue};
        padding: 12px;
        margin: 20px 0;
        font-size: ${Typography.middle1};
        font-weight: bold;
    }

    & > h3 {
        margin: 20px 0;
        font-size: ${Typography.middle1};
    }
`;

const MoveToMainButton = styled.span`
    width: 50%;
    background-color: ${Colors.mainBlue};
    color: ${Colors.mainWhite};
    border: 0;
    padding: 15px 10px;
    margin: 0 auto;
`;

export default ResultPage;
