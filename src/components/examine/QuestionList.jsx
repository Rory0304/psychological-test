import { FormCheck } from "react-bootstrap";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { inputAnswer } from "../../reducers/qaReducer";
import styled from "styled-components";
import { Colors, FontSize } from "../common/StyledConstants";

const QuestionList = React.memo(function QuestionArea({ question, setCount }) {
    //01번, 02번이 질문 사항이고, 나머지(03 ~ 10)는 질문 용어에 대한 설명임.
    const qitemNo = question.qitemNo;
    const answerOptions = ["01", "02"].map(num => ({
        key: qitemNo + num,
        qitemNo: question.qitemNo,
        answer: question[`answer${num}`],
        answerScore: question[`answerScore${num}`],
        id: qitemNo + num
    }));

    const dispatch = useDispatch();
    const preAnswers = useSelector(state => state.qaData.pre_answers);

    //이전 설문으로 돌아갈 경우, 이전의 기록을 불러와야 함.
    const defaultAnswer = preAnswers.filter(pa => pa.qitemNo === qitemNo);
    const defaultChecked = defaultAnswer[0] ? defaultAnswer[0].answer : false;

    const onChangeRadioInput = e => {
        if (!defaultChecked) {
            //해당 응답에 처음으로 체크를 했기 때문에 전체 응답 수를 1로 증가
            setCount(currentState => currentState + 1);
        }
        //이미 체크한 상태에서 체크 옵션만 바꾼 것이기 때문에 answer state만 변경
        dispatch(inputAnswer({ qitemNo, answer: e.target.value }));
    };

    return (
        <QuestionListLayout
            qitemNo={qitemNo}
            question={question}
            answerOptions={answerOptions}
            defaultChecked={defaultChecked}
            onChange={onChangeRadioInput}
        />
    );
});

export function QuestionListLayout({ qitemNo, question, answerOptions, defaultChecked, onChange }) {
    return (
        <QuestionBox>
            <Question>
                <span>{`Q${qitemNo}. `}</span>
                {question.question}
            </Question>
            <AnswerOption>
                {answerOptions.map(option => (
                    <FormCheck
                        className="radio-btn-area"
                        type="radio"
                        inline
                        label={option.answer}
                        id={option.id}
                        key={option.id}
                        name={option.qitemNo}
                        checked={option.answerScore === defaultChecked}
                        value={option.answerScore}
                        required
                        onChange={e => onChange(e)}
                    />
                ))}
            </AnswerOption>
        </QuestionBox>
    );
}

const Question = styled.p`
    font-weight: bold;
    margin-bottom: 20px;
`;

const AnswerOption = styled.div`
    width: 50%;
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
`;

const QuestionBox = styled.div`
    font-size: ${FontSize.middle1};
    background-color: ${Colors.mainGray};
    text-align: center;
    padding: 25px 20px;
    margin-bottom: 25px;
    border-radius: 14px;
    box-shadow: 0px 2px 6px 1px ${Colors.shadowGray};
`;

export default QuestionList;
