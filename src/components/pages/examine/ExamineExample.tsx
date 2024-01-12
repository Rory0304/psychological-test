import React from 'react';
import { Button, ProgressBar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import useForm from 'src/hooks/useForm';
import useProgress from 'src/hooks/useProgress';
import { Typography } from 'src/styles';
import styled from 'styled-components';

import { StyledExamineWrapper } from '../../../styles/wrapper';
import ExamineQuestionItem from './ExamineQuestionItem';

const QUESITION = {
  question: '두 가치 중에 자기에게 더 중요한 가치를 선택하세요.',
  answer01: '능력 발휘',
  answer02: '자율성',
  answerScore01: '1',
  answerScore02: '2',
};

const QITEM_NO = 0;
interface FormDataProps {
  q0: number;
}

const ExamineExample: React.FC = () => {
  const history = useHistory();

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
    <StyledExamineWrapper>
      <StyledExaminContainer>
        <header>
          <h2>
            검사 예시 <span>{progress}%</span>
          </h2>
          <ProgressBar
            visuallyHidden
            variant="progress-bar-green"
            now={progress}
            label={`${progress}%`}
          />
        </header>
        <main role="main">
          <StyledExamineManual>
            <p className="lh-base">
              직업과 관련된 두 개의 가치 중에서 자기에게 더 중요한 가치에
              표시하세요.
              <br /> 가치의 뜻을 잘 모르겠다면 문항 아래에 있는 가치의 설명을
              확인해보세요.
            </p>
          </StyledExamineManual>
          <ExamineQuestionItem
            questionNumber={QITEM_NO}
            question={QUESITION}
            answeredValue={formData.q0.toString()}
            onInputChange={(value: string) => handleChange('q0', value)}
          />
          <StyleButtonWrapper>
            {formData.q0 !== '0' ? (
              <Button
                disabled={false}
                size="lg"
                onClick={() => history.push('/examine')}
              >
                검사 시작
              </Button>
            ) : (
              <Button disabled={true} size="lg">
                검사 시작
              </Button>
            )}
          </StyleButtonWrapper>
        </main>
      </StyledExaminContainer>
    </StyledExamineWrapper>
  );
};

const StyledExaminContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledExamineManual = styled.div`
  margin: 35px 0;
  font-size: ${Typography.middle2};
`;

const StyleButtonWrapper = styled.div`
  display: grid;
`;

export default ExamineExample;
