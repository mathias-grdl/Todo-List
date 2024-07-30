import { useState } from "react";
import TodoForm from "../TodoForm";
import Todo from "../Todo";
import SearchBar from "../SearchBar";
import { useTodos } from "@/hooks/useTodo";

export default function TodoWrapper() {
	const [searchTerm, setSearchTerm] = useState("");

	const {
		addTodo,
		toggleTodoProperty,
		deleteTodo,
		updateTodo,
		handleFilterChange,
		filteredTodos,
	} = useTodos(searchTerm);

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

			{filteredTodos.length > 0 && (
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
			)}
		</div>
	);
}
