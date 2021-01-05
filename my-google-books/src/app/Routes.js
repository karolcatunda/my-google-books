import React, { useState } from 'react';

import Login from '../views/Login';
import { Route, Switch } from 'react-router-dom';
import Home from '../views/Home';
import { Grid, Box } from 'grommet'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import FavoriteBooks from '../components/FavoriteBooks';

/* React Routes */
export const HOME_PATH = '/home';
export const FAVORITES_BOOKS_PATH = '/favorites';

export default function Routes() {
  const [token, setToken] = useState('')
    // const location = useLocation();
    //const GOOGLE_API_REDIRECT_URI = 'https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/books&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=http://localhost:3000/home&client_id=855994734142-cdenn2tt65qi4qc6v6u5pih33dcn5ru2.apps.googleusercontent.com'

    return (
      <Switch>
        <Route component={Login} exact path='/' />
        <PrivateRoute component={<Home />} exact path={HOME_PATH} />
        <PrivateRoute component={<FavoriteBooks />} exact path={FAVORITES_BOOKS_PATH} />
        {/* <Route exact path="/google-api-auth" component={() => window.location.href = GOOGLE_API_REDIRECT_URI} /> */}
        {/* <PrivateRoute component={AddFrame(<Dashboard />)} exact path={DASHBOARD} />
        <PrivateRoute component={AddFrame(<ClustersPanel />)} exact path={CLUSTERS_PANEL} />
        <PrivateRoute component={AddFrame(<ClusterDetails />)} exact path={CLUSTERS_PANEL + '/:uuid'} />
        <PrivateRoute component={AddFrame(<CreateCluster />)} exact path={CREATE_CLUSTER} />
        <PrivateRoute component={AddFrame(<Resources />)} exact path={RESOURCES} />
        <PrivateRoute component={AddFrame(<Devices location={location} />)} exact path={[SERVERS, APPLIANCES, VMS, SWITCHES, IAPS]} />
        <PrivateRoute component={AddFrame(<Profiles />)} exact path={PROFILES} /> */}
      </Switch>
    );
}

/**
 * Augment component with standard topbar and sidebar
 *
 * @param {Object} component main component to be augmented
 * @return {React.Component} input component on a Grid with standard topbar and sidebar
 */
function AddFrame(component) {
  return (
    <Grid
      rows={['70px', 'auto']}
      columns={['min-content', 'auto']}
      style={{ minHeight: '100vh' }}
      areas={[
        // { name: 'header', start: [1, 0], end: [1, 1] },
        // { name: 'sidebar', start: [0, 0], end: [0, 1] },
        { name: 'main', start: [1, 1], end: [1, 1] },
      ]}
    >
      {/* <Box gridArea='header' background='white'><Header /></Box> */}
      {/* <Box gridArea='sidebar' background='brand'><Sidebar /></Box> */}
      <Box gridArea='main' background='light-1'>{component}</Box>
    </Grid>
  );
}

function PrivateRoute({ component, ...rest }) {

  // PrivateRoute.propTypes = {
  //   component: PropTypes.object.isRequired
  // };

  // const isAuthenticated = useSelector(state => state.isAuthenticated);
  return (
    <Route {...rest} render={() => component} />
        // <Redirect
        //   to={{ 
        //     pathname: '/',
        //     state: { from: location}
        //   }}
        // />
      // }
    // />
  );
}
  