import React from "react";
import { useAppSelector } from "src/hooks/useAppSelector";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import ProgressBar from "react-bootstrap/ProgressBar";
import { fetchQuestionData, handleNextPage, handlePrevPage } from "../../modules/psyQuestion";
import QuestionList from "./QuestionList";
import Pagination from "./Pagination";
import { LoadingPage } from "../common/LoadingPage";
import { ExamineWrapper, MainWrapper } from "../common/Wrapper";

import "./ExaminePaper.css";
import useProgress from "src/hooks/useProgress";
import { setAnswerSheet } from "src/modules/psyAnswerSheet";

function ExaminePaper() {
    const dispatch = useAppDispatch();

    const loading = useAppSelector(state => state.psyQuestion.loading);
    const { answer_sheet } = useAppSelector(state => state.psyAnswerSheet);
    const { offset, count } = useAppSelector(state => state.psyQuestion.pagination_data);
    const questionData = useAppSelector(state => state.psyQuestion.question_data);

    const { progress } = useProgress({
        count: answer_sheet.filter(Boolean).length,
        total: questionData.length
    });

    React.useEffect(() => {
        if (questionData.length <= 0) {
            dispatch(fetchQuestionData());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questionData]);

    React.useEffect(() => {
        dispatch(setAnswerSheet({ total: questionData?.length ?? 0 }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questionData]);

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
                    <ProgressBar visuallyHidden now={progress} label={`${progress}%`} />
                </header>
                <main role="main">
                    {questionData.slice(offset, offset + count).map(question => (
                        <QuestionList
                            key={question.qitemNo}
                            question={question}
                            questionNumber={question.qitemNo}
                            answeredValue={answer_sheet[question.qitemNo - 1]?.answer ?? "0"}
                        />
                    ))}
                    <Pagination
                        total={questionData.length}
                        count={count}
                        offset={offset}
                        questionCount={questionData.slice(offset, offset + count).length}
                        answerCount={
                            answer_sheet?.slice(offset, offset + count).filter(Boolean).length
                        }
                        onNextClick={() => dispatch(handleNextPage())}
                        onPrevClick={() => dispatch(handlePrevPage())}
                    />
                </main>
            </ExamineWrapper>
        </MainWrapper>
    );
}

export default ExaminePaper;
