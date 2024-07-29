import { useState } from "react";
import useDebounce from "./useDebounce";
import useLocalStorageTodos from "./useLocalStorageTodos";

export const useTodos = (searchTerm) => {
	const [todos, setTodos] = useLocalStorageTodos("todos", []);
	const [isFilterCompleted, setIsFilterCompleted] = useState(false);

	const addTodo = (value) => {
		setTodos((prevTodos) => [
			...prevTodos,
			{ id: Date.now(), task: value, completed: false, isEditing: false },
		]);
	};

	const toggleTodoProperty = (id, property) => {
		setTodos((prevTodos) =>
			prevTodos.map((todo) =>
				todo.id === id ? { ...todo, [property]: !todo[property] } : todo
			)
		);
	};

	const deleteTodo = (id) => {
		setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
	};

	const updateTodo = (task, id) => {
		setTodos((prevTodos) =>
			prevTodos.map((todo) =>
				todo.id === id ? { ...todo, task, isEditing: false } : todo
			)
		);
	};

	const handleFilterChange = (e) => {
		setIsFilterCompleted(e);
	};

	const debouncedSearchTerm = useDebounce(searchTerm, 300);

	const filteredTodos = todos
		.filter((todo) =>
			todo.task.toLowerCase().includes(debouncedSearchTerm?.toLowerCase())
		)
		.filter((todo) => (isFilterCompleted ? todo.completed : true));

	return {
		todos,
		addTodo,
		toggleTodoProperty,
		deleteTodo,
		updateTodo,
		handleFilterChange,
		filteredTodos,
	};
};
