import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { Typography } from 'src/styles';
import styled from 'styled-components';

interface PaginationProps {
  questionCount: number; // 현재 페이지의 질문수
  answerCount: number; // 현재 페이지의 응답수
  total: number;
  count: number;
  offset: number;
  onPrevClick: () => void;
  onNextClick: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  offset,
  total,
  count,
  answerCount,
  questionCount,
  onPrevClick,
  onNextClick,
}) => {
  const history = useHistory();

  const isLastPage = offset === total - (total % count);
  const isAnsweredAllQuestions = answerCount === questionCount;

  return (
    <StyledPaginationWrapper>
      {offset === 0 ? (
        <Button
          variant="secondary"
          type="button"
          onClick={() => history.push('/')}
        >
          처음으로
        </Button>
      ) : (
        <Button variant="secondary" type="button" onClick={onPrevClick}>
          이전
        </Button>
      )}

      <StyledButtonArea>
        {!isLastPage ? (
          <>
            <StyledNextButtonLabel
              htmlFor="nextButton"
              hidden={isAnsweredAllQuestions}
            >
              모든 문항에 응답해야 합니다.
            </StyledNextButtonLabel>
            <Button
              type="button"
              id="nextButton"
              disabled={!isAnsweredAllQuestions}
              onClick={onNextClick}
            >
              다음
            </Button>
          </>
        ) : (
          <Button
            type="button"
            className="btn-block"
            disabled={!isAnsweredAllQuestions}
            onClick={() => history.push('/result-view')}
          >
            검사 완료
          </Button>
        )}
      </StyledButtonArea>
    </StyledPaginationWrapper>
  );
};

const StyledPaginationWrapper = styled.div`
  text-align: center;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 3rem 0;
  align-items: end;
  gap: 1.5rem;
`;

const StyledButtonArea = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  // grid
  order: 2;
`;

const StyledNextButtonLabel = styled.label<{ hidden: boolean }>`
  width: 100%;
  font-size: ${Typography.small};
  visibility: ${props => (props.hidden ? 'hidden' : 'visible')};
  margin-bottom: 10px;
  text-align: center;
`;

export default Pagination;
