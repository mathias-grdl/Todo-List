import { useState } from "react";
import { Trash2, SquarePen } from "lucide-react";
import ToastError from "@/utils/ToastError";

export default function Todo({
	todo,
	toggleComplete,
	deleteTodo,
	toggleEdit,
	updateTodo,
}) {
	const [editTask, setEditTask] = useState(todo.task);

	const handleEditChange = (e) => {
		setEditTask(e.target.value);
	};

	const handleEditSubmit = (e) => {
		e.preventDefault();
		if (editTask.trim()) {
			updateTodo(editTask, todo.id);
		} else {
			ToastError("Task cannot be empty");
		}
	};

	return (
		<div className="bg-gray-100 my-5 rounded-lg">
			{!todo.isEditing ? (
				<div className="p-3 flex justify-between items-center">
					<span
						className={`card-title overflow-hidden cursor-pointer ${
							todo.completed ? "line-through" : ""
						}`}
						onClick={() => toggleComplete(todo.id)}
					>
						{todo.task}
					</span>
					<div className="flex gap-x-2">
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
			) : (
				<form
					onSubmit={handleEditSubmit}
					className="p-3 flex justify-between items-center join"
				>
					<input
						className="input input-bordered w-full rounded-r-none"
						value={editTask}
						onChange={handleEditChange}
						placeholder="Update task"
					/>
					<button type="submit" className="btn rounded-r-full ml-2">
						Update
					</button>
				</form>
			)}
		</div>
	);
}
