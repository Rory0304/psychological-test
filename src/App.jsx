import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import Route from "./Routes";

import qaDataSlice from "./reducers/qaReducer";
import resultDataSlice from "./reducers/resultReducer";

const rootReducer = combineReducers({
    qaData: qaDataSlice.reducer,
    resultData: resultDataSlice.reducer
});

const store = configureStore({
    reducer: rootReducer
});

store.subscribe(() => console.log(store.getState()));

function App() {
    return (
        <Provider store={store}>
            <div className="font-body">
                <Route></Route>
            </div>
        </Provider>
    );
}

export default App;
