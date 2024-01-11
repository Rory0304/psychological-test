import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Link } from 'react-router-dom';

import useForm from 'src/hooks/useForm';
import useProgress from 'src/hooks/useProgress';
import { Colors, Typography } from 'src/styles';
import styled from 'styled-components';

import { ExamineWrapper, MainWrapper } from '../common/Wrapper';
import ExamineQuestionItem from './ExamineQuestionItem';

interface FormDataProps {
  q0: number;
}

const ExamineExample: React.FC = () => {
  const question = {
    question: '두 가치 중에 자기에게 더 중요한 가치를 선택하세요.',
    answer01: '능력 발휘',
    answer02: '자율성',
    answerScore01: '1',
    answerScore02: '2',
  };
  const qitemNo = 0;
  const { formData, handleChange } = useForm<keyof FormDataProps, string>({
    init: {
      q0: '0',
    },
  });

  const { progress } = useProgress({
    total: 1,
    count: formData.q0 === '0' ? 0 : 1,
  });

  return (
    <MainWrapper center={true}>
      <ExamineWrapper>
        <header>
          <h2>
            검사 예시 <span>{progress}%</span>
          </h2>
          <ProgressBar now={progress} label={`${progress}%`} visuallyHidden />
        </header>
        <main role="main">
          <ExamineManual>
            <p>
              직업과 관련된 두 개의 가치 중에서 자기에게 더 중요한 가치에
              표시하세요.
              <br /> 가치의 뜻을 잘 모르겠다면 문항 아래에 있는 가치의 설명을
              확인해보세요.
            </p>
          </ExamineManual>
          <ExamineQuestionItem
            questionNumber={qitemNo}
            question={question}
            answeredValue={formData.q0.toString()}
            onInputChange={(value: string) => handleChange('q0', value)}
          />
          <>
            <NextButtonLabel htmlFor="다음 버튼" hidden={formData.q0 !== '0'}>
              모든 문항에 응답해야 합니다.
            </NextButtonLabel>
            {formData.q0 !== '0' ? (
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
};

const ExamineManual = styled.div`
  margin: 35px 0;
  font-size: ${Typography.middle2};

  & > p {
    line-height: 24px;
  }
`;

const NextButtonLabel = styled.label<{ hidden: boolean }>`
  width: 100%;
  font-size: ${Typography.small};
  visibility: ${props => (props.hidden ? 'visible' : 'hidden')};
  margin-bottom: 10px;
  text-align: center;
`;

const NextButton = styled.button`
  width: 100%;
  height: 50px;
  border: none;
  padding: 8px 15px;
  border-radius: 11px;
  background-color: ${Colors.mainBlue};
  color: #fff;
  transition: background-color 0.5s ease;
  font-size: ${Typography.middle2};

  &:disabled {
    opacity: 56%;
  }

  &:hover {
    box-shadow: 1px 1px 5px 1px ${Colors.shadowGray};
  }
`;

export default ExamineExample;
