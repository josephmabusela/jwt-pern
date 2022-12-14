import React, { Fragment, useState } from "react";

const InputTodo = ({ setTodosChange }) => {
	const [description, setDescription] = useState("");

	const onSubmitForm = async (e) => {
		e.preventDefault();
		try {
			const myHeaders = new Headers();

			myHeaders.append("Content-Type", "application/json");
			myHeaders.append("token", localStorage.token);

			const body = { description };

			const response = await fetch("/dashboard/todos", {
				method: "POST",
				headers: myHeaders,
				body: JSON.stringify(body),
			});

			const parseResponse = await response.json();
			console.log(parseResponse);

			setTodosChange(true);
			setDescription("");
			// window.location = "/";
		} catch (err) {
			console.error(err.message);
		}
	};
	return (
		<Fragment>
			<form className="d-flex mt-5" onSubmit={onSubmitForm}>
				<input
					type="text"
					placeholder="add a todo"
					className="form-control"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<button className="btn btn-success">Add</button>
			</form>
		</Fragment>
	);
};

export default InputTodo;
