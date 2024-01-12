import React from 'react';
import { Provider } from 'react-redux';

import Layout from 'src/components/blocks/Global/Layout';
import { store } from 'src/store';

import Route from './Routes';
import './styles/custom-bootstrap.css';
import './styles/custom.scss';
import './styles/global.css';
import './styles/reset.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Layout>
        <Route />
      </Layout>
    </Provider>
  );
};

export default App;
