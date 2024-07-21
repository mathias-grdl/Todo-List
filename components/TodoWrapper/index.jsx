import React, { useState } from "react";
import TodoForm from "../TodoForm";
import Todo from "../Todo";
import EditTodoForm from "../EditTodoForm";

export default function TodoWrapper() {
	const [todos, setTodos] = useState([]);

	const addTodo = (value) => {
		setTodos((prevTodos) => [
			...prevTodos,
			{ id: Date.now(), task: value, completed: false, isEditing: false },
		]);
	};

	const toggleComplete = (id) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		);
	};

	const deletedTodo = (id) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	const editTodo = (id) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
			)
		);
	};

	const editTask = (task, id) => {
		setTodos((prevTodos) =>
			prevTodos.map((todo) =>
				todo.id === id ? { ...todo, task, isEditing: false } : todo
			)
		);
	};

	return (
		<div className="bg-black p-5 rounded-lg w-full">
			<TodoForm addTodo={addTodo} />
			{todos.map((todo) => {
				return !todo.isEditing ? (
					<Todo
						key={todo.id}
						todo={todo}
						toggleComplete={toggleComplete}
						deletedTodo={deletedTodo}
						editTodo={editTodo}
					/>
				) : (
					<EditTodoForm todo={todo} editTodo={editTask} />
				);
			})}
		</div>
	);
}
