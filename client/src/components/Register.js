import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ setAuth }) => {
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
		name: "",
	});

	const { email, password, name } = inputs;

	const onChange = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	const onSubmitForm = async (e) => {
		e.preventDefault();

		try {
			const body = { email, password, name };

			const response = await fetch("http://localhost:5000/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});

			const parseRes = await response.json();

			localStorage.setItem("token", parseRes.token);
			setAuth(true);
		} catch (err) {
			console.error(err.message);
		}
	};

	return (
		<Fragment>
			<h1 className="text-center my-5">Register</h1>
			<form onSubmit={onSubmitForm}>
				<input
					type="text"
					name="email"
					placeholder="email"
					value={email}
					className="form-control my-3"
					onChange={(e) => onChange(e)}
				/>
				<input
					type="current-password"
					name="password"
					placeholder="password"
					value={password}
					className="form-control my-3"
					onChange={(e) => onChange(e)}
				/>
				<input
					type="text"
					name="name"
					placeholder="name"
					value={name}
					className="form-control my-3"
					onChange={(e) => onChange(e)}
				/>
				<button className="btn btn-success btn-block">Submit</button>
			</form>
			<Link to="/login">Login</Link>
		</Fragment>
	);
};

export default Register;
