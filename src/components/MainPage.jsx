import useInputs from "./hooks/useInput";
import { useHistory  } from "react-router-dom";
import { StartButton } from "./common/Button";

function MainPage() {

    let history = useHistory();
    const [{ username, gender }, onChange] = useInputs({
        username: "",
        gender: ''
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if (username && gender) {            
            history.push('/examine-example');
        }
        console.log(username, gender);
    }

    return (
        <main>
            <h1>직업 가치관 검사</h1>
            <form onSubmit={onSubmit}>
                <label id="username">이름</label>
                <input type="text" aria-label="usernmae" aria-required="true" required value={username} name="username" onChange={onChange}/><br/>
                <label id="gender">성별</label>
                <p>
                    남자
                    <input aria-label="gender" type="radio" value="male" name="gender" onChange={onChange} required />
                </p>
                <p>
                    여자
                    <input aria-label="gender" type="radio" value="female" name="gender" onChange={onChange} />
                </p>
                <StartButton type="submit" status={username && gender ? true : false}>검사시작</StartButton>
            </form>
        </main>
    )
    
}

export default MainPage;