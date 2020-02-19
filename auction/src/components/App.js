import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Register from './Register';
import Shop from './Shop';
import Page404 from './Page404';

import Footer from './Common/Footer';

import '../styles/App.scss';

import UserContextProvider from '../services/UserContext';
import SecureRoute from './Common/SecureRoute';

import { setAPIBaseURL } from '../services/SessionService';
import config from '../config';

function App() {
	useEffect(() => {
		setAPIBaseURL(config.API_URL);
	}, []);

  	return (
		<UserContextProvider>
			<Router>
				<div className="main">
					<Switch>
						<Route exact path='/' component={Home} />
						<Route path='/login' component={Login} />
						<Route path='/register' component={Register} />
						<SecureRoute path='/shop' component={Shop} />
						<Route component={Page404}/>
					</Switch>
				</div>
				<Footer/>
			</Router>
		</UserContextProvider>
	);
}

export default App;
