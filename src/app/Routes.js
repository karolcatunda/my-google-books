import React from 'react';
import Login from '../views/Login';
import { Route, Switch } from 'react-router-dom';
import Home from '../views/Home';
import FavoriteBooks from '../components/FavoriteBooks';

export const HOME_PATH = '/home';
export const FAVORITES_BOOKS_PATH = '/favorites';

/**
 * Routes creates the routes to be used by My Google Books app
 */
export default function Routes() {
    return (
      <Switch>
        <Route component={Login} exact path='/' />
        <PrivateRoute component={<Home />} exact path={HOME_PATH} />
        <PrivateRoute component={<FavoriteBooks />} exact path={FAVORITES_BOOKS_PATH} />
      </Switch>
    );
}

function PrivateRoute({ component, ...rest }) {
  return (
    <Route {...rest} render={() => component} />
  );
}
  