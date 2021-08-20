import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { resetState, inputUserInfo } from "../reducers/reducer";
import useInputs from "./hooks/useInput";
import { StartButton } from "./common/Button";

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
        <main>
            <h1>직업 가치관 검사</h1>
            <form className="user-form" onSubmit={handleSubmit}>
                <label>
                    이름
                    <input
                        type="text"
                        aria-label="usernmae"
                        aria-required="true"
                        required
                        value={username}
                        name="username"
                        onChange={onChange}
                    />
                </label>
                <br />
                <label>
                    성별
                    <p>
                        남자
                        <input
                            aria-label="gender"
                            type="radio"
                            value="male"
                            name="gender"
                            onChange={onChange}
                            required
                        />
                    </p>
                    <p>
                        여자
                        <input
                            aria-label="gender"
                            type="radio"
                            value="female"
                            name="gender"
                            onChange={onChange}
                        />
                    </p>
                </label>
                <StartButton status={username && gender ? true : false}>검사시작</StartButton>
            </form>
        </main>
    );
}

export default MainPage;
