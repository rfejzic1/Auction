import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Register from './Register';
import Shop from './Shop';
import Page404 from './Page404';
import ProductPage from './ProductPage';

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
						<Route exact path='/login' component={Login} />
						<Route exact path='/register' component={Register} />
						<SecureRoute exact path='/shop' component={Shop} />
						<SecureRoute exact path='/shop/:uuid' component={ProductPage}/>
						<Route component={Page404}/>
					</Switch>
				</div>
				<Footer/>
			</Router>
		</UserContextProvider>
	);
}

export default App;
