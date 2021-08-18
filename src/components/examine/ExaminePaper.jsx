import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { SET_LOADING, INPUT_ANSWER } from "../../reducer/variables";
import { PrevButton, NextButton } from "../common/Button";
import { LoadingPage } from "../common/LoadingPage";

const QuestionArea = React.memo(function QuestionArea({ question, checked }) {
    //01번, 02번이 질문 사항이고, 나머지(03 ~ 10)는 질문 용어에 대한 설명임.
    const answersNum = ["01", "02"];
    const qitemNo = question.qitemNo;
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
            {answersNum.map(
                an =>
                    question[`answer${an}`] && (
                        <label key={`${qitemNo}${an}`}>
                            {question[`answer${an}`]}
                            <input
                                type="radio"
                                id={`${qitemNo}${an}`}
                                name={qitemNo}
                                checked={
                                    question[`answerScore${an}`] ===
                                    defaultChecked
                                }
                                value={question[`answerScore${an}`]}
                                required
                                onChange={e =>
                                    dispatch({
                                        type: INPUT_ANSWER,
                                        payload: {
                                            qitemNo: qitemNo,
                                            answer: e.target.value
                                        }
                                    })
                                }
                            />
                        </label>
                    )
            )}
        </div>
    );
});

function ExaminePaper({ title }) {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.loading);
    const [questions, setQuestion] = useState([]);
    const limit = 5;
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const fetchQuestions = async () => {
            dispatch({ type: SET_LOADING, payload: true });
            await axios
                .get(
                    `https://www.career.go.kr/inspct/openapi/test/questions?apikey=${process.env.REACT_APP_API_KEY}&q=6`
                )
                .then(data => {
                    // [help] 데이터 수가 28개밖에 없어서 모두 fetch하는 방법으로 가져왔는데, 만약 데이터 수가 많아질 경우 잘라서 가져오는 방법 알아보기
                    // offset과 limit를 활용하면 될 것 같은데 api 정보에는 없어서 어떤 식으로 가져오면 되는지 조언 필요
                    console.log(data.data.RESULT);
                    setQuestion([...data.data.RESULT]);
                })
                .catch(e => console.log(e));
            dispatch({ type: SET_LOADING, payload: false });
        };
        fetchQuestions();
    }, []);

    if (loading && questions.length === 0) {
        return (
            <LoadingPage>
                <p>Loading</p>
            </LoadingPage>
        );
    } else {
        return (
            <div className="examine-wrapper">
                <h2>{title}</h2>
                <article>
                    {questions.slice(offset, offset + limit).map(question => {
                        return (
                            <QuestionArea
                                question={question}
                                key={question.qitemNo}
                            />
                        );
                    })}
                    {offset !== 0 && (
                        <PrevButton onClick={() => setOffset(offset - limit)}>
                            이전
                        </PrevButton>
                    )}
                    {offset !== questions.length - (questions.length % 5) && (
                        <NextButton onClick={() => setOffset(offset + limit)}>
                            다음
                        </NextButton>
                    )}
                </article>
            </div>
        );
    }
}

export default ExaminePaper;
