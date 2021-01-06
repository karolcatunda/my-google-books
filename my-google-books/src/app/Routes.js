import React, { useState } from 'react';

import Login from '../views/Login';
import { Route, Switch } from 'react-router-dom';
import Home from '../views/Home';
import FavoriteBooks from '../components/FavoriteBooks';

/* React Routes */
export const HOME_PATH = '/home';
export const FAVORITES_BOOKS_PATH = '/favorites';

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
  