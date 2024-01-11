import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

import { setAnswerSheet } from 'src/features/psyAnswerSheetSlice';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { useAppSelector } from 'src/hooks/useAppSelector';
import useProgress from 'src/hooks/useProgress';
import type { APIStatus } from 'src/types/apiStatus';
import type { QuestionDataProps } from 'src/types/psyQuestion';
import apiFetch from 'src/utils/apiFetch';

import { LoadingPage } from '../common/LoadingPage';
import { ExamineWrapper, MainWrapper } from '../common/Wrapper';
import './ExaminePaper.css';
import ExamineQuestionItem from './ExamineQuestionItem';
import Pagination from './Pagination';

const QUESTION_PAGE_COUNT = 5;

const ExaminePaper: React.FC = () => {
  const dispatch = useAppDispatch();

  const { answer_sheet } = useAppSelector(state => state.psyAnswerSheet);

  //
  //
  //
  const [status, setStatus] = React.useState<APIStatus>('idle');
  const [questionData, setQuestionData] = React.useState<QuestionDataProps[]>(
    []
  );
  const [offset, setOffset] = React.useState(0);

  //
  //
  //
  const { progress } = useProgress({
    count: answer_sheet.filter(Boolean).length,
    total: questionData.length,
  });

  //
  //
  //
  const handlePageChange = React.useCallback(
    (type: 'next' | 'prev') => {
      if (type === 'next') {
        if (
          offset !==
          questionData.length - (questionData.length % QUESTION_PAGE_COUNT)
        ) {
          setOffset(current => current + QUESTION_PAGE_COUNT);
        }
      }

      if (type === 'prev') {
        if (offset !== 0) {
          setOffset(current => current - QUESTION_PAGE_COUNT);
        }
      }
    },
    [offset, questionData]
  );

  React.useEffect(() => {
    const fetchQuestionData = () => {
      setStatus('pending');
      apiFetch<{ RESULT: QuestionDataProps[] }>(
        `${process.env.REACT_APP_CAREER_PSY_QUESTION_ENDPOINT}?apikey=${process.env.REACT_APP_API_KEY}&q=6`
      )
        .then(res => {
          setQuestionData(res.RESULT);
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
    dispatch(setAnswerSheet({ total: questionData?.length ?? 0 }));
  }, [questionData]);

  if (status === 'pending' && questionData.length === 0) {
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
          <ol>
            {questionData
              .slice(offset, offset + QUESTION_PAGE_COUNT)
              .map(question => (
                <li key={question.qitemNo}>
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
            total={questionData.length}
            count={QUESTION_PAGE_COUNT}
            offset={offset}
            questionCount={
              questionData.slice(offset, offset + QUESTION_PAGE_COUNT).length
            }
            answerCount={
              answer_sheet
                ?.slice(offset, offset + QUESTION_PAGE_COUNT)
                .filter(Boolean).length
            }
            onNextClick={() => handlePageChange('next')}
            onPrevClick={() => handlePageChange('prev')}
          />
        </main>
      </ExamineWrapper>
    </MainWrapper>
  );
};

export default ExaminePaper;
