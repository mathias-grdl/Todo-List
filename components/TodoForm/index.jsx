import { useState } from "react";

export default function TodoForm({ addTodo }) {
	const [task, setTask] = useState("");
	const [error, setError] = useState("");

	const handleChange = (e) => {
		if (error) {
			setError("");
		}
		setTask(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!task) {
			setError("Task cannot be empty");
			return;
		}

		addTodo(task);
		setTask("");
	};
	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="join w-full">
					<input
						className="input input-bordered join-item"
						placeholder="New task"
						onChange={handleChange}
						value={task}
					/>
					<button
						type="submit"
						className="btn join-item rounded-r-full"
					>
						add task
					</button>
				</div>
			</form>
			{error ? (
				<span className="error-message bg-warning">{error}</span>
			) : null}
		</>
	);
}
