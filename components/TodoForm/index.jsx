import ToastError from "@/utils/ToastError";
import { useState } from "react";

export default function TodoForm({ addTodo }) {
	const [task, setTask] = useState("");

	const handleChange = (e) => setTask(e.target.value);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (task.trim()) {
			addTodo(task);
			setTask("");
		} else {
			ToastError("Task cannot be empty");
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="join w-full">
				<input
					className="input input-bordered join-item w-full"
					placeholder="New task"
					onChange={handleChange}
					value={task}
				/>
				<button type="submit" className="btn join-item rounded-r-full">
					Add Task
				</button>
			</div>
		</form>
	);
}
