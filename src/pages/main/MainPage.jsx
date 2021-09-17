import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { MainWrapper, IntroWrapper } from "../../components/Wrapper";
import { resetState, inputUserInfo } from "../../reducers/qaReducer";
import useInputs from "../../hooks/useInput";
import RadioInput from "../../components/RadioInput";
import { StartButton } from "../../components/Button";
import tw, { styled } from "twin.macro";

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
        <MainWrapper center={true}>
            <main role="main">
                <IntroWrapper>
                    <h1>직업 가치관 검사</h1>
                    <p>
                        직업가치관 검사는 여러분이 직업을 선택할 때 어떤 가치를
                        중요하게 여기는지 알아보기 위한 것입니다. 직업가치관은
                        여러분의 직업선택에 중요한 기준이 되며, 자신의 가치와
                        일치하는 직업을 가졌을 때 더 큰 만족감과 성취감을 느끼게
                        됩니다. 직업가치관 검사 결과를 통해 직업에 있어 나에게
                        어떤 가치가 중요한지 이해하는 데 도움이 될 것입니다.
                    </p>
                </IntroWrapper>
                <div className="bg-gray p-7">
                    <form
                        className="text-lg custom-form"
                        onSubmit={handleSubmit}
                    >
                        <div className="mb-5">
                            <label className="block font-bold text-center text-gray-700">
                                이름
                                <input
                                    className="block px-3 py-2 m-auto my-2 leading-tight text-gray-700 border rounded shadow outline-none appearance-none focus:border-blue required"
                                    type="text"
                                    placeholder="이름을 작성하세요."
                                    value={username}
                                    name="username"
                                    onChange={onChange}
                                />
                            </label>
                            <ErrorMessage status={username === ""}>
                                이름은 필수 입력 사항입니다.
                            </ErrorMessage>
                        </div>
                        <div className="mb-5">
                            <label className="block mb-2 font-bold text-center test-gray-700">
                                성별
                            </label>
                            <div className="flex justify-center gap-10 my-2">
                                <RadioInput
                                    name="gender"
                                    value="male"
                                    label="남자"
                                    onChange={onChange}
                                />
                                <RadioInput
                                    name="gender"
                                    value="female"
                                    label="여자"
                                    onChange={onChange}
                                />
                            </div>
                            <ErrorMessage status={gender === ""}>
                                성별은 필수 입력 사항입니다.
                            </ErrorMessage>
                        </div>
                        <StartButton status={username && gender}>
                            검사시작
                        </StartButton>
                    </form>
                </div>
            </main>
        </MainWrapper>
    );
}

const ErrorMessage = styled.p`
    visibility: ${props => (props.status ? "visible" : "hidden")};
    ${tw`text-xs`};
    text-align: center;
    ${tw`text-red-500`};
`;

export default MainPage;
