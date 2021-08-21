import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, connect } from "react-redux";

import { inputAnswer, fetchQuestionData } from "../../reducers/reducer";
import { PrevButton, NextButton } from "../common/Button";
import { LoadingPage } from "../common/LoadingPage";

const QuestionArea = React.memo(function QuestionArea({ question, checked }) {
    //01번, 02번이 질문 사항이고, 나머지(03 ~ 10)는 질문 용어에 대한 설명임.
    const qitemNo = question.qitemNo;
    const questionData = ["01", "02"].map(num => ({
        key: qitemNo + num,
        qitemNo: question.qitemNo,
        answer: question[`answer${num}`],
        answerScore: question[`answerScore${num}`],
        id: `${question}`
    }));

    const dispatch = useDispatch();
    const preAnswers = useSelector(state => state.pre_answers);

    //이전 설문으로 돌아갈 경우, 이전의 기록을 불러와야 함.
    const defaultAnswer = preAnswers.filter(pa => pa.qitemNo === qitemNo);
    const defaultChecked = defaultAnswer[0] ? defaultAnswer[0].answer : false;

    return (
        <div>
            <p>
                <span>{`Q${qitemNo}. `}</span>
                {question.question}
            </p>
            {questionData.map(question => (
                <label key={question.key}>
                    {question.answer}
                    <input
                        type="radio"
                        id={question.id}
                        name={question.qitemNo}
                        checked={question.answerScore === defaultChecked}
                        value={question.answerScore}
                        required
                        onChange={e => dispatch(inputAnswer({ qitemNo, answer: e.target.value }))}
                    />
                </label>
            ))}
        </div>
    );
});

function ExaminePaper({ title }) {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.loading);
    const questionData = useSelector(state => state.question_data);
    const limit = 5;
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        dispatch(fetchQuestionData());
    }, []);

    if (loading && questionData.length === 0) {
        return (
            <LoadingPage>
                <p>Loading</p>
            </LoadingPage>
        );
    }
    return (
        <div className="examine-wrapper">
            <h2>{title}</h2>
            <article>
                {questionData.slice(offset, offset + limit).map(question => {
                    return <QuestionArea question={question} key={question.qitemNo} />;
                })}
                {offset !== 0 && (
                    <PrevButton onClick={() => setOffset(offset - limit)}>이전</PrevButton>
                )}
                {offset !== questionData.length - (questionData.length % 5) && (
                    <NextButton onClick={() => setOffset(offset + limit)}>다음</NextButton>
                )}
            </article>
        </div>
    );
}

export default ExaminePaper;
