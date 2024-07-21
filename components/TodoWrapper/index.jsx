import React, { useState } from "react";
import TodoForm from "../TodoForm";
import Todo from "../Todo";

export default function TodoWrapper() {
	const [todos, setTodos] = useState([]);

	const addTodo = (value) => {
		setTodos((prevTodos) => [
			...prevTodos,
			{ id: Date.now(), task: value, completed: false, isEditing: false },
		]);
	};

	return (
		<div className="bg-black p-5 rounded-lg w-full">
			<TodoForm addTodo={addTodo} />
			{todos.map((todo) => {
				return <Todo key={todo.id} todo={todo} />;
			})}
		</div>
	);
}