import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import useRoutes from './routes';
import { observer } from 'mobx-react';
import AuthStore from './mobx/auth';
import GameStore from './mobx/game';
import Spinner from './components/Spinner/Spinner';
import UserStore from './mobx/user';
import 'brace/mode/javascript';
import 'brace/theme/github';
import 'brace/theme/monokai';
import 'brace/theme/tomorrow_night';
import 'brace/theme/twilight';
import 'brace/theme/xcode';
import 'brace/mode/html';
import 'brace/mode/json';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { accessToken } = AuthStore;
  const routes = useRoutes(!!accessToken);
  return (
    <BrowserRouter>
      <ToastContainer />
      {GameStore.loading && <Spinner />}
      {UserStore.loading && <Spinner />}
      {UserStore.usersLoading && <Spinner />}
      {AuthStore.loading && <Spinner />}
      <Menu />
      {routes}
    </BrowserRouter>
  );
}

export default observer(App);
