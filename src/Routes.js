import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import MainPage from "./components/main/MainPage";
import ResultPage from "./components/result/ResultPage";
import ExamineExample from "./components/examine/ExamineExample";
import ExaminePaper from "./components/examine/ExaminePaper";

export default function Routes() {
    const { name, gender } = useSelector(state => state.qaData.answer_sheet);

    window.onpopstate = function (event) {
        if (event) {
            alert("변경사항이 저장되지 않을 수 있습니다.");
            window.location.reload();
        }
    };

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
