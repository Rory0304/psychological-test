import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import Route from "./Routes";
import styled from "styled-components";

import qaDataSlice from "./reducers/qaReducer";
import resultDataSlice from "./reducers/resultReducer";
import "./App.css";

const rootReducer = combineReducers({
    qaData: qaDataSlice.reducer,
    resultData: resultDataSlice.reducer
});

const store = configureStore({
    reducer: rootReducer
});

store.subscribe(() => console.log(store.getState()));

function App() {
    const MainWrapper = styled.div`
        height: 100vh;
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
