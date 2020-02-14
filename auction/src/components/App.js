import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Register from './Register';
import TopBar from './Common/TopBar';
import NavBar from './Common/NavBar';

import '../styles/App.scss';

function App() {
  return (
    <Router>
      <TopBar/>
      <NavBar/>
      <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
