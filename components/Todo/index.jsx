import React, { useState, memo, useCallback } from "react";
import { Trash2, SquarePen } from "lucide-react";
import Toast from "@/utils/Toast";
import { alphanumericSpaceRegex } from "@/utils/Regex";

const Todo = memo(
	({ todo, toggleComplete, deleteTodo, toggleEdit, updateTodo }) => {
		const [editTask, setEditTask] = useState(todo.task);

		const handleEditChange = useCallback((e) => {
			const input = e.target.value;
			if (alphanumericSpaceRegex.test(input) || input === "") {
				setEditTask(input);
			} else {
				Toast("error", "Only letters and numbers are allowed.");
			}
		}, []);
		const handleEditSubmit = useCallback(
			(e) => {
				e.preventDefault();
				if (editTask.trim()) {
					updateTodo(editTask, todo.id);
				} else {
					Toast("error", "Task cannot be empty");
				}
			},
			[editTask, updateTodo, todo.id]
		);

		return (
			<div
				className={`bg-gray-100 border-2 my-5 rounded-lg p-3 flex justify-between items-center ${
					todo.completed ? "border-red" : "border-green"
				}`}
			>
				<div className="flex items-center gap-2 flex-grow overflow-hidden mr-2">
					<input
						type="checkbox"
						className="checkbox"
						onChange={() => toggleComplete(todo.id)}
						checked={todo.completed}
					/>
					{!todo.isEditing ? (
						<span
							className={`card-title overflow-auto text-ellipsis whitespace-nowrap cursor-pointer flex-grow ${
								todo.completed ? "line-through" : ""
							}`}
							onClick={() => toggleComplete(todo.id)}
						>
							{todo.task}
						</span>
					) : (
						<form
							onSubmit={handleEditSubmit}
							className="p-3 flex justify-between items-center w-full"
						>
							<input
								className="input input-bordered w-full rounded-r-none"
								value={editTask}
								onChange={handleEditChange}
								placeholder="Update task"
							/>
							<button
								type="submit"
								className="btn rounded-r-full ml-2"
							>
								Update
							</button>
						</form>
					)}
				</div>
				<div className="flex gap-x-2 flex-shrink-0">
					<SquarePen
						className="cursor-pointer"
						onClick={() => toggleEdit(todo.id)}
					/>
					<Trash2
						className="cursor-pointer"
						onClick={() => deleteTodo(todo.id)}
					/>
				</div>
			</div>
		);
	}
);

Todo.displayName = "Todo";

export default Todo;
