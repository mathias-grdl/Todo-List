import { useCallback, useEffect, useState } from "react";
import TodoForm from "../TodoForm";
import Todo from "../Todo";
import SearchBar from "../SearchBar";
import useDebounce from "@/hooks/useDebounce";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function TodoWrapper() {
	const [todos, setTodos] = useLocalStorage("todos", []);
	const [isCompleted, setIsCompleted] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	useEffect(() => {
		const storedTodos = localStorage.getItem("todos");
		if (storedTodos) {
			setTodos(JSON.parse(storedTodos));
		}
		return;
	}, []);

	useEffect(() => {
		if (todos.length > 0) {
			localStorage.setItem("todos", JSON.stringify(todos));
		}
		return;
	}, [todos]);

	const addTodo = useCallback((value) => {
		setTodos((prevTodos) => [
			...prevTodos,
			{ id: Date.now(), task: value, completed: false, isEditing: false },
		]);
	}, []);

	const toggleTodoProperty = useCallback((id, property) => {
		setTodos((prevTodos) =>
			prevTodos.map((todo) =>
				todo.id === id ? { ...todo, [property]: !todo[property] } : todo
			)
		);
	}, []);

	const deleteTodo = useCallback((id) => {
		setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
	}, []);

	const updateTodo = useCallback((task, id) => {
		setTodos((prevTodos) =>
			prevTodos.map((todo) =>
				todo.id === id ? { ...todo, task, isEditing: false } : todo
			)
		);
	}, []);

	const handleFilterChange = useCallback((e) => {
		setIsCompleted(e);
	}, []);

	const filteredTodos = todos
		.filter((todo) =>
			todo.task.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
		)
		.filter((todo) => (isCompleted ? todo.completed : true));

	return (
		<div className="w-full">
			<div className="bg-blue rounded-lg shadow-md">
				<TodoForm addTodo={addTodo} />
				<SearchBar
					handleFilterChange={handleFilterChange}
					setSearchTerm={setSearchTerm}
					searchTerm={searchTerm}
				/>
			</div>

			{filteredTodos.length > 0 ? (
				<div className="p-5 rounded-lg w-full bg-blue shadow-lg">
					{filteredTodos.map((todo) => (
						<Todo
							key={todo.id}
							todo={todo}
							toggleComplete={() =>
								toggleTodoProperty(todo.id, "completed")
							}
							deleteTodo={() => deleteTodo(todo.id)}
							toggleEdit={() =>
								toggleTodoProperty(todo.id, "isEditing")
							}
							updateTodo={(task) => updateTodo(task, todo.id)}
						/>
					))}
				</div>
			) : null}
		</div>
	);
}
