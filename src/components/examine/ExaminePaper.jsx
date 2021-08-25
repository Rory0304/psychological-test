import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FormCheck, ProgressBar } from "react-bootstrap";
import {
    inputAnswer,
    fetchQuestionData,
    handleNextPageAction,
    handlePrevPageAction
} from "../../reducers/qaReducer";
import { PrevButton, NextButton, NextButtonLabel, SubmitButton } from "../common/Button";
import { LoadingPage } from "../common/LoadingPage";

import "./ExaminePaper.css";

const QuestionArea = React.memo(function QuestionArea({ question, setCount }) {
    //01번, 02번이 질문 사항이고, 나머지(03 ~ 10)는 질문 용어에 대한 설명임.
    const qitemNo = question.qitemNo;
    const questionData = ["01", "02"].map(num => ({
        key: qitemNo + num,
        qitemNo: question.qitemNo,
        answer: question[`answer${num}`],
        answerScore: question[`answerScore${num}`],
        id: qitemNo + num
    }));

    const dispatch = useDispatch();
    const preAnswers = useSelector(state => state.qaData.pre_answers);

    //이전 설문으로 돌아갈 경우, 이전의 기록을 불러와야 함.
    const defaultAnswer = preAnswers.filter(pa => pa.qitemNo === qitemNo);
    const defaultChecked = defaultAnswer[0] ? defaultAnswer[0].answer : false;

    return (
        <div className="question-list">
            <p>
                <span>{`Q${qitemNo}. `}</span>
                {question.question}
            </p>
            <div className="answer-list">
                {questionData.map(question => (
                    <FormCheck
                        className="radio-btn-area"
                        type="radio"
                        inline
                        label={question.answer}
                        id={question.id}
                        key={question.id}
                        name={question.qitemNo}
                        checked={question.answerScore === defaultChecked}
                        value={question.answerScore}
                        required
                        onChange={e => {
                            if (!defaultChecked) {
                                //해당 응답에 처음으로 체크를 했기 때문에 전체 응답 수를 1로 증가
                                setCount(currentState => currentState + 1);
                            }
                            //이미 체크한 상태에서 체크 옵션만 바꾼 것이기 때문에 answer state만 변경
                            dispatch(inputAnswer({ qitemNo, answer: e.target.value }));
                        }}
                    />
                ))}
            </div>
        </div>
    );
});

function Pagination({ count, questionDataLength }) {
    const dispatch = useDispatch();
    const { offset, limit } = useSelector(state => state.qaData.pagination_data);

    return (
        <div className="pagination-wrapper">
            {offset !== 0 && (
                <PrevButton onClick={() => dispatch(handlePrevPageAction())}>이전</PrevButton>
            )}
            {offset !== questionDataLength - (questionDataLength % limit) ? (
                <div class="next-button-area">
                    <NextButtonLabel
                        htmlFor="nextButton"
                        status={count === offset || count % 5 !== 0}
                    >
                        모든 문항에 응답해야 합니다.
                    </NextButtonLabel>
                    <NextButton
                        id="nextButton"
                        disabled={count === offset || count % 5 !== 0}
                        onClick={() => dispatch(handleNextPageAction())}
                    >
                        다음
                    </NextButton>
                </div>
            ) : (
                <Link to="/result-view">
                    <SubmitButton>검사 완료</SubmitButton>
                </Link>
            )}
        </div>
    );
}

function ExaminePaper() {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.qaData.loading);
    const { offset, limit } = useSelector(state => state.qaData.pagination_data);
    const questionData = useSelector(state => state.qaData.question_data);
    const [progress, setProgress] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        dispatch(fetchQuestionData());
    }, []);

    useEffect(() => {
        if (count !== 0) {
            setProgress(parseInt(count * (100 / questionData.length)));
        }
    }, [count]);

    if (loading && questionData.length === 0) {
        return (
            <LoadingPage>
                <p>Loading</p>
            </LoadingPage>
        );
    }
    return (
        <div className="main-wrapper">
            <header>
                <h2>
                    검사 진행<span>{progress}%</span>
                </h2>
                <ProgressBar now={progress} visuallyhidden={true} />
            </header>
            <main>
                <div className="questionArea-wrapper">
                    {questionData.slice(offset, offset + limit).map(question => {
                        return (
                            <QuestionArea
                                question={question}
                                key={question.qitemNo}
                                setCount={setCount}
                            />
                        );
                    })}
                    <Pagination questionDataLength={questionData.length} count={count} />
                </div>
            </main>
        </div>
    );
}

export default ExaminePaper;
