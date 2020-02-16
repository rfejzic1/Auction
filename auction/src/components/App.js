import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Register from './Register';
import Shop from './Shop';

import TopBar from './Common/TopBar';
import NavBar from './Common/NavBar';
import Footer from './Common/Footer';

import '../styles/App.scss';
import UserContextProvider from '../services/UserContext';
import SecureRoute from './Common/SecureRoute';

function App() {
  	return (
		<UserContextProvider>
			<Router>
				<div className="main">
					<TopBar/>
					<NavBar/>
					<Switch>
						<Route exact path='/' component={Home} />
						<Route path='/login' component={Login} />
						<Route path='/register' component={Register} />
						<SecureRoute path='/shop' component={Shop} />
					</Switch>
				</div>
				<Footer/>
			</Router>
		</UserContextProvider>
	);
}

export default App;
