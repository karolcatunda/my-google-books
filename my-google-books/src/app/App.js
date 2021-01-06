import React from 'react';
import Routes from './Routes';
import { Grommet } from 'grommet';
import { BrowserRouter as Router} from 'react-router-dom';
import './App.scss'

function App() {
  return (
    <Grommet theme={'#1a8cff'}>
      <Router>
        <Routes />
      </Router>
    </Grommet >
  );
}

export default App;
