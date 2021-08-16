import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainPage from "./components/MainPage";
import ExamineExample from "./components/examine/ExamineExample";

export default function Routes(params) {
    return (
        <BrowserRouter>
            <>
                <Switch>
                    <Route exact path="/">
                        <MainPage />
                </Route>
                    <Route exact path="/examine-example">
                        <ExamineExample/>
                    </Route>
                </Switch>
            </>
        </BrowserRouter>
    )
}