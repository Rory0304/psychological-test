import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import styled from "styled-components";

import { MainWrapper, IntroWrapper } from "../common/Wrapper";
import { Colors } from "../common/StyledConstants";
import { resetState, inputUserInfo } from "../../reducers/qaReducer";
import useInputs from "../hooks/useInput";
import { StartButton } from "../common/Button";

import "bootstrap/dist/css/bootstrap.css";
import "./MainPage.css";

function MainPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [{ username, gender }, onChange] = useInputs({
        username: "",
        gender: ""
    });

    useEffect(() => {
        dispatch(resetState());
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        if (username && gender) {
            dispatch(inputUserInfo({ gender, username }));
            history.push("/examine-example");
        } else {
            alert("정보를 모두 입력하세요!");
        }
    };

    return (
        <MainWrapper>
            <main>
                <IntroWrapper>
                    <h1>직업 가치관 검사</h1>
                    <p>
                        직업가치관 검사는 여러분이 직업을 선택할 때 어떤 가치를 중요하게 여기는지
                        알아보기 위한 것입니다. 직업가치관은 여러분의 직업선택에 중요한 기준이 되며,
                        자신의 가치와 일치하는 직업을 가졌을 때 더 큰 만족감과 성취감을 느끼게
                        됩니다. 직업가치관 검사 결과를 통해 직업에 있어 나에게 어떤 가치가 중요한지
                        이해하는 데 도움이 될 것입니다.
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
                                    onChange={onChange}
                                />
                            </InputTextDiv>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>성별</Form.Label>
                            <InputRadioDiv>
                                <Form.Check
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    label="남자"
                                    aria-label="남자"
                                    id="male"
                                    required
                                    onChange={onChange}
                                />
                                <Form.Check
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    label="여자"
                                    aria-label="여자"
                                    id="female"
                                    onChange={onChange}
                                />
                            </InputRadioDiv>
                        </Form.Group>
                        <StartButton status={username && gender ? true : false}>
                            검사시작
                        </StartButton>
                    </Form>
                </FormWrapper>
            </main>
        </MainWrapper>
    );
}

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

export default MainPage;
