import { useState, useEffect } from "react";

const useLocalStorageTodos = (key, initialValue) => {
	const [todos, setTodos] = useState(initialValue);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const storedTodos = localStorage.getItem(key);
			if (storedTodos) {
				try {
					setTodos(JSON.parse(storedTodos));
				} catch (error) {
					console.error(
						"Erreur lors de la lecture de localStorage:",
						error
					);
					localStorage.removeItem(key);
				}
			}
		}
	}, [key]);

	useEffect(() => {
		if (typeof window !== "undefined") {
			try {
				localStorage.setItem(key, JSON.stringify(todos));
			} catch (error) {
				console.error(
					"Erreur lors de l'écriture dans localStorage:",
					error
				);
			}
		}
	}, [todos, key]);

	return [todos, setTodos];
};

export default useLocalStorageTodos;
