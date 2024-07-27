import React, { memo, useCallback, useState } from "react";
import Toast from "@/utils/Toast";
import { alphanumericSpaceRegex } from "@/utils/Regex";

const TodoForm = memo(({ addTodo }) => {
	const [task, setTask] = useState("");

	const handleChange = useCallback((e) => {
		setTask(e.target.value);
	}, []);

	const handleSubmit = useCallback(
		(e) => {
			e.preventDefault();
			if (task.trim() && alphanumericSpaceRegex.test(task)) {
				addTodo(task);
				setTask("");
			} else if (!task.trim()) {
				Toast("error", "Task cannot be empty");
			} else {
				Toast("error", "Only letters and numbers are allowed.");
			}
		},
		[task, addTodo]
	);

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
});

TodoForm.displayName = "TodoForm";

export default TodoForm;
