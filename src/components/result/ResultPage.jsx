import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import useActions from "../hooks/useActions";
import { FontSize, Colors } from "../common/StyledConstants";
import { UserInfo, MajorTable, EduTable } from "./Table";
import ValueGraph from "./ValueGraph";
import { ViewResultButton, MoveToMainButton } from "../common/Button";
import { MainWrapper, IntroWrapper } from "../common/Wrapper";

function ResultPage() {
    const [viewStatus, setViewStatus] = useState(false);

    return (
        <>
            {viewStatus ? (
                <ResultWrapper>
                    <ResultPaper />
                    <Link to="/" className="goto-main">
                        <MoveToMainButton>다시 검사하기</MoveToMainButton>
                    </Link>
                </ResultWrapper>
            ) : (
                <ResultPreview setViewStatus={setViewStatus} />
            )}
        </>
    );
}

/* 검사 예시 페이지 */
function ResultPreview({ setViewStatus }) {
    const { name } = useSelector(state => state.qaData.answer_sheet);
    const { bestTwo, worstTwo } = useSelector(state => state.resultData);
    const { setResultPreview } = useActions();

    useEffect(() => {
        setResultPreview();
    }, []);

    return (
        <MainWrapper center={true}>
            <main role="main">
                <IntroWrapper>
                    <h1>검사가 완료되었습니다.</h1>
                    <p>
                        검사 결과는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게
                        생각하는지를 알려주고, 중요 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼
                        기회를 제공합니다.
                    </p>
                    <p>
                        직업생활과 관련하여 <b>{name}</b>님은<b> {bestTwo[0]}</b>(와)과{" "}
                        <b>{bestTwo[1]}</b>
                        (을)를 가장 중요하게 생각합니다. 반면에{" "}
                        <b>
                            {worstTwo[0]},{worstTwo[1]}
                        </b>
                        은(는) 상대적으로 덜 중요하게 생각합니다.
                    </p>
                    <ViewResultButton type="button" onClick={() => setViewStatus(true)}>
                        결과 확인하기
                    </ViewResultButton>
                </IntroWrapper>
            </main>
        </MainWrapper>
    );
}

/* 검사 결과 페이지 */
function ResultPaper() {
    const { loading, score_data, jobdata_edu, jobdata_major } = useSelector(
        state => state.resultData
    );
    const { setAllResultData } = useActions();

    useEffect(() => {
        setAllResultData();
    }, []);

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
                <UserInfo />
            </ResultHeader>
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
        font-size: ${FontSize.big};
        font-weight: bold;
        text-align: center;
    }

    & > p {
        padding: 15px 5px;
        font-size: ${FontSize.middle2};
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
        font-size: ${FontSize.middle1};
        font-weight: bold;
    }

    & > h3 {
        margin: 20px 0;
        font-size: ${FontSize.middle1};
    }
`;

export default ResultPage;
