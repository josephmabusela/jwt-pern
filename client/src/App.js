import React, { Fragment, useState, useEffect } from "react";
import "./App.css";

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";

// COMPONENTS
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Landing from "./components/Landing";

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const setAuth = (boolean) => {
		setIsAuthenticated(boolean);
	};

	async function isAuth() {
		try {
			const response = await fetch("/auth/is-verify", {
				method: "GET",
				headers: { token: localStorage.token },
			});

			const parseRes = await response.json();

			parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
		} catch (err) {
			console.error(err.message);
		}
	}

	useEffect(() => {
		isAuth();
	});

	return (
		<Fragment>
			<Router>
				<div className="container">
					<Switch>
						<Route
							exact
							path="/"
							render={(props) =>
								!isAuthenticated ? (
									<Landing {...props} />
								) : (
									<Redirect to="/dashboard" />
								)
							}
						/>
						<Route
							exact
							path="/login"
							render={(props) =>
								!isAuthenticated ? (
									<Login {...props} setAuth={setAuth} />
								) : (
									<Redirect to="/dashboard" />
								)
							}
						/>
						<Route
							exact
							path="/register"
							render={(props) =>
								!isAuthenticated ? (
									<Register {...props} setAuth={setAuth} />
								) : (
									<Redirect to="/login" />
								)
							}
						/>
						<Route
							exact
							path="/dashboard"
							render={(props) =>
								isAuthenticated ? (
									<Dashboard {...props} setAuth={setAuth} />
								) : (
									<Redirect to="/login" />
								)
							}
						/>
					</Switch>
				</div>
			</Router>
		</Fragment>
	);
}

export default App;
