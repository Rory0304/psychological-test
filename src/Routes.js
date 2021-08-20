import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import MainPage from "./components/MainPage";
import ExamineExample from "./components/examine/ExamineExample";
import ExaminePaper from "./components/examine/ExaminePaper";

export default function Routes(params) {
    const { name, gender } = useSelector(state => state.answer_sheet);

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
                </Switch>
            </>
        </BrowserRouter>
    );
}
