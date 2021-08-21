import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Route from "./Routes";
import styled from "styled-components";

import questionDataSlice from "./reducers/reducer";

const store = configureStore({
    reducer: questionDataSlice
});

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
