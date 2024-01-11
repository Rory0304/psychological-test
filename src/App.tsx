import React from 'react';
import { Provider } from 'react-redux';

import { store } from 'src/store';

import Route from './Routes';
import './styles/global.css';
import './styles/reset.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
};

export default App;
