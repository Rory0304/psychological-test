import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Colors, Typography } from "src/styles";

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
    onNextClick
}) => {
    const isLastPage = offset === total - (total % count);
    const isAnsweredAllQuestions = answerCount === questionCount;

    return (
        <PaginationWrapper>
            <PrevButton onClick={onPrevClick} hidden={offset === 0}>
                이전
            </PrevButton>
            <NextButtonArea>
                {!isLastPage ? (
                    <>
                        <NextButtonLabel htmlFor="nextButton" hidden={isAnsweredAllQuestions}>
                            모든 문항에 응답해야 합니다.
                        </NextButtonLabel>
                        <NextButton
                            id="nextButton"
                            disabled={!isAnsweredAllQuestions}
                            onClick={onNextClick}
                        >
                            다음
                        </NextButton>
                    </>
                ) : (
                    <Link to="/result-view">
                        <NextButton id="nextButton" disabled={!isAnsweredAllQuestions}>
                            검사 완료
                        </NextButton>
                    </Link>
                )}
            </NextButtonArea>
        </PaginationWrapper>
    );
};

const NextButtonArea = styled.div`
    width: 47%;
    text-align: center;
    display: inline-block;
`;

const PaginationWrapper = styled.div`
    text-align: center;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
`;

const PrevButton = styled.button<{ hidden: boolean }>`
    width: 47%;
    height: 50px;
    border: none;
    padding: 8px 15px;
    border-radius: 11px;
    color: #000;
    background-color: ${Colors.mainGrayDarker};
    opacity: 56%;
    font-size: ${Typography.middle2};
    visibility: ${props => (props.hidden ? "hidden" : "visible")};
    &:hover {
        box-shadow: 1px 1px 5px 1px ${Colors.shadowGray};
    }
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

const NextButtonLabel = styled.label<{ hidden: boolean }>`
    width: 100%;
    font-size: ${Typography.small};
    visibility: ${props => (props.hidden ? "hidden" : "visible")};
    margin-bottom: 10px;
    text-align: center;
`;

export default Pagination;
