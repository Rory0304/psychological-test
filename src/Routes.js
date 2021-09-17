import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import MainPage from "./pages/main/MainPage";
import ResultPage from "./pages/result/ResultPage";
import ExamineExample from "./pages/examine/ExamineExample";
import ExaminePaper from "./pages/examine/ExaminePaper";

export default function Routes() {
    return (
        <BrowserRouter>
            <>
                <Switch>
                    <Route exact path="/">
                        <MainPage />
                    </Route>
                    <PrivateRoute
                        exact
                        path="/examine-example"
                        component={ExamineExample}
                    />
                    <PrivateRoute
                        exact
                        path="/examine"
                        component={ExaminePaper}
                    />
                    <PrivateRoute
                        exact
                        path="/result-view"
                        component={ResultPage}
                    />
                </Switch>
            </>
        </BrowserRouter>
    );
}

export const PrivateRoute = ({ component: Component }) => {
    const { name, gender } = useSelector(state => state.qaData.answer_sheet);

    return (
        <Route
            render={props =>
                name && gender ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: "/" }} />
                )
            }
        />
    );
};
