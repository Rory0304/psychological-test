import React from "react";
import { Provider } from "react-redux";
import Route from "./Routes";
import { store } from "src/store";

import "./styles/reset.css";
import "./styles/global.css";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Route />
        </Provider>
    );
};

export default App;
