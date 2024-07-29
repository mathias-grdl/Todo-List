import { useState } from "react";
import Toast from "@/utils/Toast";
import { alphanumericSpaceRegex } from "@/utils/Regex";

const TodoForm = ({ addTodo }) => {
	const [task, setTask] = useState("");

	const handleChange = (e) => {
		setTask(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (task.trim() && alphanumericSpaceRegex.test(task)) {
			addTodo(task);
			setTask("");
		} else if (!task.trim()) {
			Toast("error", "Task cannot be empty");
		} else {
			Toast("error", "Only letters and numbers are allowed.");
		}
	};

	return (
		<form onSubmit={handleSubmit} className="rounded-lg p-5">
			<div className="join w-full">
				<input
					className="input input-bordered join-item w-full"
					placeholder="New task"
					onChange={handleChange}
					value={task}
				/>
				<button type="submit" className="btn join-item rounded-r-lg">
					Add Task
				</button>
			</div>
		</form>
	);
};

export default TodoForm;
