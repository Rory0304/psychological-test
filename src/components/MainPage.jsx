import useInputs from "./hooks/useInput";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { StartButton } from "./common/Button";

import "./MainPage.css";

function MainPage() {
    const dispatch = useDispatch();

    const [{ username, gender }, onChange] = useInputs({
        username: "",
        gender: ""
    });

    return (
        <main>
            <h1>직업 가치관 검사</h1>
            <form className="user-form">
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
                <Link to="/examine-example">
                    <StartButton
                        type="submit"
                        disabled={username && gender ? false : true}
                        status={username && gender ? true : false}
                        onClick={() =>
                            dispatch({
                                type: "INPUT_USERINFO",
                                payload: { gender, username }
                            })
                        }
                    >
                        검사시작
                    </StartButton>
                </Link>
            </form>
        </main>
    );
}

export default MainPage;
