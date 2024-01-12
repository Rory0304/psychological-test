import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import MainPage from './components/pages/main/MainPage';
import ExamineExample from './components/pages/examine/ExamineExample';
import ExaminePaper from './components/pages/examine/ExaminePaper';
import ResultPage from './components/pages/result/ResultPage';
import { useAppSelector } from './hooks/useAppSelector';
import type { RootState } from './store';

export default function Routes() {
  const { name, gender } = useAppSelector(
    (state: RootState) => state.psyUserInfo
  );

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
