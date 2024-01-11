import React from 'react';
import { FormCheck } from 'react-bootstrap';

import { setUserAnswer } from 'src/features/psyAnswerSheetSlice';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { Colors, Typography } from 'src/styles';
import type { QuestionDataProps } from 'src/types/psyQuestion';
import styled from 'styled-components';

interface ExamineQuestionItemProps {
  question: Partial<QuestionDataProps>;
  questionNumber: number;
  answeredValue: string;
  onInputChange?: (value: string) => void;
}

const ExamineQuestionItem: React.FC<ExamineQuestionItemProps> = ({
  question,
  questionNumber,
  answeredValue,
  onInputChange,
}) => {
  const dispatch = useAppDispatch();

  //01번, 02번이 질문 사항이고, 나머지(03 ~ 10)는 질문 용어에 대한 설명임.
  const answerOptions = ['01', '02'].map(num => ({
    key: questionNumber + num,
    qitemNo: 'q' + questionNumber,
    answer: question[`answer${num}` as keyof QuestionDataProps],
    answerScore: question[`answerScore${num}` as keyof QuestionDataProps] ?? '',
    id: questionNumber + num,
    checked:
      answeredValue ===
      question[`answerScore${num}` as keyof QuestionDataProps],
  }));

  const handleRadioInputChange = (value: string) => {
    //이미 체크한 상태에서 체크 옵션만 바꾼 것이기 때문에 answer state만 변경
    dispatch(setUserAnswer({ qitemNo: questionNumber, answer: value }));
  };

  return (
    <StyledQuestionBox>
      <StyledQuestion>
        <span>{`Q${questionNumber}. `}</span>
        {question.question}
      </StyledQuestion>
      <StyledAnswerOption>
        {answerOptions.map(option => (
          <FormCheck
            required
            inline
            type="radio"
            className="radio-btn-area"
            label={option.answer}
            id={option.id}
            key={option.key}
            name={option.qitemNo}
            value={option.answerScore}
            checked={option.checked}
            onChange={e =>
              typeof onInputChange === 'function'
                ? onInputChange(e.target.value)
                : handleRadioInputChange(e.target.value)
            }
          />
        ))}
      </StyledAnswerOption>
    </StyledQuestionBox>
  );
};

const StyledQuestion = styled.p`
  font-weight: bold;
  margin-bottom: 20px;
`;

const StyledAnswerOption = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
`;

const StyledQuestionBox = styled.div`
  font-size: ${Typography.middle1};
  background-color: ${Colors.mainGray};
  text-align: center;
  padding: 18px;
  margin-bottom: 25px;
  border-radius: 14px;
  box-shadow: 0px 2px 6px 1px ${Colors.shadowGray};
`;

export default React.memo(ExamineQuestionItem);
