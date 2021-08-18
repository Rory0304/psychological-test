import { createStore } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./reducer/reducer";
import Route from "./Routes";
import styled from "styled-components";

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));
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
