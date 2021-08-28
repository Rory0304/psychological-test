import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontSize } from "../common/StyledConstants";

import useInputs from "../hooks/useInput";
import { NextButton, NextButtonLabel } from "../common/Button";
import { ProgressBar } from "react-bootstrap";
import { ExamineWrapper, MainWrapper } from "../common/Wrapper";
import { QuestionListLayout } from "./QuestionList";

function ExamineExample() {
    const question = {
        question: "두 가치 중에 자기에게 더 중요한 가치를 선택하세요.",
        answer01: "능력 발휘",
        answer02: "자율성",
        answerScore01: 1,
        answerScore02: 2
    };
    const qitemNo = 0;
    const answerOptions = ["01", "02"].map(num => ({
        key: qitemNo + num,
        qitemNo: "q" + qitemNo,
        answer: question[`answer${num}`],
        answerScore: question[`answerScore${num}`],
        id: qitemNo + num
    }));

    const [{ q0 }, onChange] = useInputs({
        q0: 0
    });

    return (
        <MainWrapper center={true}>
            <ExamineWrapper>
                <header>
                    <h2>
                        검사 예시 <span>{0}%</span>
                    </h2>
                    <ProgressBar now={0} visuallyhidden={true} />
                </header>
                <main role="main">
                    <ExamineManual>
                        <p>
                            직업과 관련된 두 개의 가치 중에서 자기에게 더 중요한 가치에 표시하세요.
                            <br /> 가치의 뜻을 잘 모르겠다면 문항 아래에 있는 가치의 설명을
                            확인해보세요.
                        </p>
                    </ExamineManual>
                    <QuestionListLayout
                        isExample={true}
                        qitemNo={qitemNo}
                        question={question}
                        answerOptions={answerOptions}
                        onChange={onChange}
                    />
                    <>
                        <NextButtonLabel htmlFor="다음 버튼" status={q0 === 0}>
                            모든 문항에 응답해야 합니다.
                        </NextButtonLabel>
                        {q0 !== 0 ? (
                            <Link to="/examine">
                                <NextButton id="nextButton" disabled={false}>
                                    검사 시작
                                </NextButton>
                            </Link>
                        ) : (
                            <NextButton id="nextButton" disabled={true}>
                                검사 시작
                            </NextButton>
                        )}
                    </>
                </main>
            </ExamineWrapper>
        </MainWrapper>
    );
}

const ExamineManual = styled.div`
    margin: 35px 0;
    font-size: ${FontSize.middle2};

    & > p {
        line-height: 24px;
    }
`;
export default ExamineExample;
