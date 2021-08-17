import { createStore } from "redux";
import { Provider } from "react-redux";
import { INPUT_USERINFO } from "./reducer/variables";
import Route from "./Routes";
import styled from "styled-components";

const initialState = {
    username: "",
    gender: ""
};

const reducer = (state = initialState, action) => {
    console.log("reducer call");
    switch (action.type) {
        case INPUT_USERINFO:
            return { username: action.username, gender: action.gender };

        default:
            return state;
    }
};

const store = createStore(reducer);

function App() {
    const MainWrapper = styled.div`
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    `;
    return (
        <Provider store={store}>
            <MainWrapper>
                <Route></Route>
            </MainWrapper>
        </Provider>
    );
}

export default App;
