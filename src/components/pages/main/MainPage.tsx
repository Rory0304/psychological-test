import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { resetUserAnswer } from 'src/features/psyAnswerSheetSlice';
import { resetResult } from 'src/features/psyResultSlice';
import { resetUserInfo, setUserInfo } from 'src/features/psyUserInfoSlice';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import useForm from 'src/hooks/useForm';
import { Colors } from 'src/styles';
import { StyledIntroWrapper } from 'src/styles/wrapper';
import type { GenderType } from 'src/types/psyUserInfo';
import styled from 'styled-components';

interface FormDataProps {
  username: string;
  gender: string;
}

const MainPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const { formData, handleChange } = useForm<keyof FormDataProps, string>({
    init: {
      username: '',
      gender: '',
    },
  });

  const username = formData.username;
  const gender = formData.gender;

  React.useEffect(() => {
    dispatch(resetUserInfo());
    dispatch(resetUserAnswer());
    dispatch(resetResult());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && gender) {
      dispatch(setUserInfo({ gender: gender as GenderType, name: username }));
      history.push('/examine-example');
    } else {
      alert('정보를 모두 입력하세요.');
    }
  };

  return (
    <main role="main">
      <StyledMainWrapper>
        <StyledIntroWrapper>
          <h1>직업 가치관 검사</h1>
          <p>
            {`직업가치관 검사는 여러분이 직업을 선택할 때 어떤 가치를 중요하게 여기는지 알아보기 위한 것입니다.\n직업가치관은 여러분의 직업선택에 중요한 기준이 되며,\n자신의 가치와 일치하는 직업을 가졌을 때 더 큰 만족감과 성취감을 느끼게 됩니다.\n직업가치관 검사 결과를 통해 직업에 있어 나에게 어떤 가치가 중요한지 이해하는 데 도움이 될 것입니다.`}
          </p>
        </StyledIntroWrapper>
        <StyledFormWrapper>
          <StyledForm onSubmit={handleSubmit}>
            <StyledFormGroup>
              <Form.Label>이름</Form.Label>
              <InputTextDiv>
                <Form.Control
                  required
                  type="text"
                  name="username"
                  value={username}
                  placeholder="이름을 작성하세요"
                  onChange={e => handleChange('username', e.target.value)}
                />
              </InputTextDiv>
            </StyledFormGroup>
            <StyledFormGroup>
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
                  onChange={e => handleChange('gender', e.target.value)}
                />
                <Form.Check
                  type="radio"
                  name="gender"
                  value="female"
                  label="여자"
                  aria-label="여자"
                  id="female"
                  onChange={e => handleChange('gender', e.target.value)}
                />
              </InputRadioDiv>
            </StyledFormGroup>
            <Button type="submit" disabled={!username || !gender} size="lg">
              검사 시작
            </Button>
          </StyledForm>
        </StyledFormWrapper>
      </StyledMainWrapper>
    </main>
  );
};

const StyledMainWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 0;
  overflow: scroll;
`;

const StyledFormWrapper = styled.div`
  width: 100%;
  background-color: ${Colors.mainWhite};
  padding: 25px;
  border-radius: 1.5rem;
`;

const StyledForm = styled(Form)`
  text-align: center;
  font-size: 1.5rem;

  .form-label {
    display: block;
    margin-bottom: 15px;
  }

  .form-check-label:hover {
    cursor: pointer;
  }
`;

const StyledFormGroup = styled(Form.Group)`
  margin-bottom: 1.5rem;
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
