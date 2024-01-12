import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

import OverlaySpinner from 'src/components/blocks/OverlaySpinner/OverlaySpinner';
import { setAnswerSheet } from 'src/features/psyAnswerSheetSlice';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { useAppSelector } from 'src/hooks/useAppSelector';
import useIntersection from 'src/hooks/useIntersection';
import useProgress from 'src/hooks/useProgress';
import type { APIStatus } from 'src/types/apiStatus';
import type { QuestionDataProps } from 'src/types/psyQuestion';
import apiFetch from 'src/utils/apiFetch';
import styled from 'styled-components';

import { StyledExamineWrapper } from '../../../styles/wrapper';
import { DeferredLoading } from '../../blocks/DeferredLoading';
import ExamineQuestionItem from './ExamineQuestionItem';
import Pagination from './Pagination';

const QUESTION_PAGE_COUNT = 5;

type State = {
  offset: number;
  questionData: QuestionDataProps[]; // Replace with your actual question data type
};

type Action =
  | { type: 'next' }
  | { type: 'prev' }
  | { type: 'init'; value: QuestionDataProps[] };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'init':
      return { ...state, questionData: action.value };

    case 'next':
      if (
        state.offset !==
        state.questionData.length -
          (state.questionData.length % QUESTION_PAGE_COUNT)
      ) {
        return { ...state, offset: state.offset + QUESTION_PAGE_COUNT };
      }
      return state;

    case 'prev':
      if (state.offset === 0) {
        return state;
      } else {
        return { ...state, offset: state.offset - QUESTION_PAGE_COUNT };
      }

    default:
      return state;
  }
};

const ExaminePaper: React.FC = () => {
  const appDispatch = useAppDispatch();

  const { answer_sheet } = useAppSelector(state => state.psyAnswerSheet);
  const examinePaperHeader = useIntersection<HTMLDivElement>();

  //
  //
  //
  const [questionDataState, questionDataDispatch] = React.useReducer(reducer, {
    offset: 0,
    questionData: [],
  });

  const [status, setStatus] = React.useState<APIStatus>('idle');

  //
  //
  //
  const { progress } = useProgress({
    count: answer_sheet.filter(Boolean).length,
    total: questionDataState.questionData.length,
  });

  //
  //
  //
  React.useEffect(() => {
    const fetchQuestionData = () => {
      setStatus('pending');
      apiFetch<{ RESULT: QuestionDataProps[] }>(
        `${process.env.REACT_APP_CAREER_PSY_QUESTION_ENDPOINT}?apikey=${process.env.REACT_APP_API_KEY}&q=6`
      )
        .then(res => {
          questionDataDispatch({ type: 'init', value: res.RESULT });
          setStatus('success');
        })
        .catch(error => {
          console.error(error);
          setStatus('failed');
        });
    };

    fetchQuestionData();

    return () => setStatus('idle');
  }, []);

  React.useEffect(() => {
    appDispatch(
      setAnswerSheet({ total: questionDataState.questionData?.length ?? 0 })
    );
  }, [questionDataState.questionData]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [questionDataState.offset]);

  if (status === 'pending') {
    return (
      <DeferredLoading timedOut={300}>
        <OverlaySpinner />
      </DeferredLoading>
    );
  }
  return (
    <StyledExamineWrapper>
      <header>
        <h2>
          검사 진행 <span>{progress}%</span>
        </h2>
        <div ref={examinePaperHeader.ref} />
        <StyledProgressBar isSticky={examinePaperHeader.isIntersect}>
          <ProgressBar
            visuallyHidden={examinePaperHeader.isIntersect}
            variant="progress-bar-green"
            now={progress}
            label={`${progress}%`}
          />
        </StyledProgressBar>
      </header>
      <main role="main">
        <ol>
          {questionDataState.questionData
            .slice(
              questionDataState.offset,
              questionDataState.offset + QUESTION_PAGE_COUNT
            )
            .map(question => (
              <li key={question.qitemNo} id={`q-${question.qitemNo}`}>
                <ExamineQuestionItem
                  question={question}
                  questionNumber={question.qitemNo}
                  answeredValue={
                    answer_sheet[question.qitemNo - 1]?.answer ?? '0'
                  }
                />
              </li>
            ))}
        </ol>
        <Pagination
          total={questionDataState.questionData.length}
          count={QUESTION_PAGE_COUNT}
          offset={questionDataState.offset}
          questionCount={
            questionDataState.questionData.slice(
              questionDataState.offset,
              questionDataState.offset + QUESTION_PAGE_COUNT
            ).length
          }
          answerCount={
            answer_sheet
              ?.slice(
                questionDataState.offset,
                questionDataState.offset + QUESTION_PAGE_COUNT
              )
              .filter(Boolean).length
          }
          onNextClick={() => questionDataDispatch({ type: 'next' })}
          onPrevClick={() => questionDataDispatch({ type: 'prev' })}
        />
      </main>
    </StyledExamineWrapper>
  );
};

const StyledProgressBar = styled.div<{ isSticky: boolean }>`
  position: ${props => (props.isSticky ? 'relative' : 'fixed')};
  top: 0;
  right: 0;
  width: 100%;
`;
export default ExaminePaper;
