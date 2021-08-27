import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import Route from "./Routes";

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

function App() {
    return (
        <Provider store={store}>
            <Route></Route>
        </Provider>
    );
}

export default App;
