import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProgressBar } from "react-bootstrap";

import { fetchQuestionData } from "../../reducers/qaReducer";
import QuestionList from "./QuestionList";
import Pagination from "./Pagination";
import { LoadingPage } from "../common/LoadingPage";
import { ExamineWrapper, MainWrapper } from "../common/Wrapper";

import "./ExaminePaper.css";

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
        <MainWrapper center={false}>
            <ExamineWrapper>
                <header>
                    <h2>
                        검사 진행 <span>{progress}%</span>
                    </h2>
                    <ProgressBar now={progress} visuallyhidden={true} />
                </header>
                <main role="main">
                    {questionData.slice(offset, offset + limit).map(question => (
                        <QuestionList
                            question={question}
                            key={question.qitemNo}
                            setCount={setCount}
                        />
                    ))}

                    <Pagination questionDataLength={questionData.length} count={count} />
                </main>
            </ExamineWrapper>
        </MainWrapper>
    );
}

export default ExaminePaper;
