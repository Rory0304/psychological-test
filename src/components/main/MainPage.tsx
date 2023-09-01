import React from "react";
import { useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import styled from "styled-components";

import { MainWrapper, IntroWrapper } from "../common/Wrapper";
import { Colors, Typography } from "src/styles";
import useForm from "src/hooks/useForm";
import { useAppDispatch } from "src/hooks/useAppDispatch";

import { setUserInfo, resetUserInfo } from "src/features/psyUserInfoSlice";
import { resetUserAnswer } from "src/features/psyAnswerSheetSlice";

import type { GenderType } from "src/types/psyUserInfo";

import "bootstrap/dist/css/bootstrap.css";
import "./MainPage.css";

interface FormDataProps {
    username: string;
    gender: string;
}

const MainPage: React.FC = () => {
    const history = useHistory();
    const dispatch = useAppDispatch();

    const { formData, handleChange } = useForm<keyof FormDataProps, string>({
        init: {
            username: "",
            gender: ""
        }
    });

    const username = formData.username;
    const gender = formData.gender;

    React.useEffect(() => {
        dispatch(resetUserInfo());
        dispatch(resetUserAnswer());
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username && gender) {
            dispatch(setUserInfo({ gender: gender as GenderType, name: username }));
            history.push("/examine-example");
        } else {
            alert("정보를 모두 입력하세요!");
        }
    };

    return (
        <MainWrapper center={true}>
            <main role="main">
                <IntroWrapper>
                    <h1>직업 가치관 검사</h1>
                    <p>
                        {`직업가치관 검사는 여러분이 직업을 선택할 때 어떤 가치를 중요하게 여기는지
                        알아보기 위한 것입니다. 직업가치관은 여러분의 직업선택에 중요한 기준이 되며,
                        자신의 가치와 일치하는 직업을 가졌을 때 더 큰 만족감과 성취감을 느끼게
                        됩니다. 직업가치관 검사 결과를 통해 직업에 있어 나에게 어떤 가치가 중요한지
                        이해하는 데 도움이 될 것입니다.`}
                    </p>
                </IntroWrapper>
                <FormWrapper>
                    <Form className="custom-form" onSubmit={handleSubmit}>
                        <Form.Group className="mb-4">
                            <Form.Label>이름</Form.Label>
                            <InputTextDiv>
                                <Form.Control
                                    type="text"
                                    placeholder="이름을 작성하세요"
                                    required
                                    value={username}
                                    name="username"
                                    onChange={e => handleChange("username", e.target.value)}
                                />
                            </InputTextDiv>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>성별</Form.Label>
                            <InputRadioDiv>
                                <Form.Check
                                    required
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    label="남자"
                                    aria-label="남자"
                                    id="male"
                                    onChange={e => handleChange("gender", e.target.value)}
                                />
                                <Form.Check
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    label="여자"
                                    aria-label="여자"
                                    id="female"
                                    onChange={e => handleChange("gender", e.target.value)}
                                />
                            </InputRadioDiv>
                        </Form.Group>
                        <StartButton hidden={!username || !gender}>검사시작</StartButton>
                    </Form>
                </FormWrapper>
            </main>
        </MainWrapper>
    );
};

const FormWrapper = styled.div`
    background-color: ${Colors.mainGray};
    padding: 25px;
`;

const InputTextDiv = styled.div`
    max-width: 300px;
    margin: 0 auto;

    @media screen and (max-width: 320px) {
        width: calc(100% - 20px);
    }
`;

const InputRadioDiv = styled.div`
    display: flex;
    justify-content: center;
    gap: 10%;
`;

const StartButton = styled.button<{ hidden: boolean }>`
    width: 25%;
    margin-top: 1rem;
    font-size: 15px;
    font-weight: bold;
    margin: 0 auto;
    padding: 10px 8px;
    border: 2px solid ${Colors.mainBlue};
    border-radius: 8px;
    background-color: ${props => (props.hidden ? Colors.mainBlue : Colors.mainWhite)};
    color: ${props => (props.hidden ? Colors.mainWhite : Colors.mainBlue)};
    font-size: ${Typography.middle2};
    &:hover {
        box-shadow: 1px 1px 5px 1px ${Colors.shadowGray};
    }
`;

export default MainPage;
