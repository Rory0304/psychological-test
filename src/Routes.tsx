import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import MainPage from "./components/main/MainPage";
import ResultPage from "./components/result/ResultPage";
import ExamineExample from "./components/examine/ExamineExample";
import ExaminePaper from "./components/examine/ExaminePaper";

import type { RootState } from "./store";
import { useAppSelector } from "./hooks/useAppSelector";

export default function Routes() {
    const { name, gender } = useAppSelector((state: RootState) => state.psyUserInfo);

    return (
        <BrowserRouter>
            <>
                <Switch>
                    <Route exact path="/">
                        <MainPage />
                    </Route>
                    <Route exact path="/examine-example">
                        {name && gender ? <ExamineExample /> : <Redirect to="/" />}
                    </Route>
                    <Route exact path="/examine">
                        {name && gender ? <ExaminePaper /> : <Redirect to="/" />}
                    </Route>
                    <Route exact path="/result-view">
                        {name && gender ? <ResultPage /> : <Redirect to="/" />}
                    </Route>
                </Switch>
            </>
        </BrowserRouter>
    );
}
