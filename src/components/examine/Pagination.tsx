import React from 'react';
import { Link } from 'react-router-dom';

import { Colors, Typography } from 'src/styles';
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
  const isLastPage = offset === total - (total % count);
  const isAnsweredAllQuestions = answerCount === questionCount;

  return (
    <StyledPaginationWrapper>
      <StyledButtonArea>
        <StyledPrevButton onClick={onPrevClick} hidden={offset === 0}>
          이전
        </StyledPrevButton>
      </StyledButtonArea>
      <StyledButtonArea>
        {!isLastPage ? (
          <>
            <StyledNextButtonLabel
              htmlFor="nextButton"
              hidden={isAnsweredAllQuestions}
            >
              모든 문항에 응답해야 합니다.
            </StyledNextButtonLabel>
            <StyledNextButton
              id="nextButton"
              disabled={!isAnsweredAllQuestions}
              onClick={onNextClick}
            >
              다음
            </StyledNextButton>
          </>
        ) : (
          <Link to="/result-view">
            <StyledNextButton
              id="nextButton"
              disabled={!isAnsweredAllQuestions}
            >
              검사 완료
            </StyledNextButton>
          </Link>
        )}
      </StyledButtonArea>
    </StyledPaginationWrapper>
  );
};

const StyledPaginationWrapper = styled.div`
  text-align: center;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin: 3rem 0;
`;

const StyledButtonArea = styled.div`
  width: 47%;
  text-align: center;
  display: inline-block;
`;

const StyledPrevButton = styled.button<{ hidden: boolean }>`
  width: 100%;
  height: 50px;
  border: none;
  padding: 8px 15px;
  border-radius: 11px;
  color: #000;
  background-color: ${Colors.mainGrayDarker};
  opacity: 56%;
  font-size: ${Typography.middle2};
  visibility: ${props => (props.hidden ? 'hidden' : 'visible')};
  &:hover {
    box-shadow: 1px 1px 5px 1px ${Colors.shadowGray};
  }
`;

const StyledNextButton = styled.button`
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

const StyledNextButtonLabel = styled.label<{ hidden: boolean }>`
  width: 100%;
  font-size: ${Typography.small};
  visibility: ${props => (props.hidden ? 'hidden' : 'visible')};
  margin-bottom: 10px;
  text-align: center;
`;

export default Pagination;
