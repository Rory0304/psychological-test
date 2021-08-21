import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useInputs from "../hooks/useInput";
import { StartButton } from "../common/Button";
import { ProgressBar } from "react-bootstrap";

import "./ExamineExample.css";

function ExamineExample() {
    const [now, setNow] = useState(0);
    const [{ example }, onChange] = useInputs({
        example: ""
    });

    useEffect(() => {
        example === "" ? setNow(0) : setNow(100);
    }, [example]);

    return (
        <div className="examine-wrapper">
            <h1>검사 예시</h1>
            <>
                <ProgressBar now={now} label={`${now}%`} />
            </>
            <article>
                <h2>
                    직업과 관련된 두 개의 가치 중에서 자기에게 더 중요한 가치에
                    표시하세요.
                    <br /> 가치의 뜻을 잘 모르겠다면 문항 아래에 있는 가치의
                    설명을 확인해보세요.
                </h2>
                <div>
                    <p>두 가치 중에 자기에게 더 중요한 가치를 선택하세요.</p>
                    <form>
                        <label>
                            능력 발휘
                            <input
                                type="radio"
                                id="answer01"
                                name="example"
                                value="answer01"
                                onChange={onChange}
                                required
                            />
                        </label>
                        <label>
                            자율성
                            <input
                                type="radio"
                                id="answer02"
                                name="example"
                                value="answer02"
                                onChange={onChange}
                            />
                        </label>
                        <Link to="/examine">
                            <StartButton
                                type="submit"
                                status={example ? true : false}
                            >
                                검사 시작
                            </StartButton>
                        </Link>
                    </form>
                </div>
            </article>
        </div>
    );
}

export default ExamineExample;
