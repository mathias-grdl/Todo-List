import { useEffect, useState } from "react";
import TodoForm from "../TodoForm";
import Todo from "../Todo";

export default function TodoWrapper() {
	const [todos, setTodos] = useState(() => {
		const savedTodos = localStorage.getItem("todos");
		return savedTodos ? JSON.parse(savedTodos) : [];
	});

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

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

	const deleteTodo = (id) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	const toggleEdit = (id) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
			)
		);
	};

	const updateTodo = (task, id) => {
		setTodos((prevTodos) =>
			prevTodos.map((todo) =>
				todo.id === id ? { ...todo, task, isEditing: false } : todo
			)
		);
	};

	return (
		<div className="bg-green-200 p-5 rounded-lg w-full">
			<TodoForm addTodo={addTodo} />
			{todos.map((todo) => (
				<Todo
					key={todo.id}
					todo={todo}
					toggleComplete={toggleComplete}
					deleteTodo={deleteTodo}
					toggleEdit={toggleEdit}
					updateTodo={updateTodo}
				/>
			))}
		</div>
	);
}
