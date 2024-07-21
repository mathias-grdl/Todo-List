"use client";
import TodoForm from "@/components/TodoForm";
import TodoWrapper from "@/components/TodoWrapper";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<TodoWrapper />
		</main>
	);
}
