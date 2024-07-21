import { useState } from "react";

export default function EditTodoForm({ editTodo, todo }) {
	const [task, setTask] = useState(todo.task);
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

		editTodo(task, todo.id);
		setTask("");
	};
	return (
		<>
			<form onSubmit={handleSubmit} className="my-5">
				<div className="join w-full">
					<input
						className="input input-bordered join-item"
						placeholder="Update task"
						onChange={handleChange}
						value={task}
					/>
					<button
						type="submit"
						className="btn join-item rounded-r-full"
					>
						update task
					</button>
				</div>
			</form>
			{error ? (
				<span className="error-message bg-warning">{error}</span>
			) : null}
		</>
	);
}
