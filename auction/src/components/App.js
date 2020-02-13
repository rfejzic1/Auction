import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Register from './Register';
import TopBar from './TopBar';

import '../styles/App.scss';
import Wrapper from './Common/Wrapper';

function App() {
  return (
    <Router>
      <TopBar/>
      <Switch>
        <Wrapper>
          <hr/>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </Wrapper>
      </Switch>
    </Router>
  );
}

export default App;
