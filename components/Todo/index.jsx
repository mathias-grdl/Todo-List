import { Trash2 } from "lucide-react";
import { SquarePen } from "lucide-react";

export default function Todo({ todo }) {
	return (
		<div className="bg-gray-100 my-5 rounded-lg">
			<div className="p-3 flex justify-between items-center ">
				<span className="card-title overflow-hidden">{todo.task}</span>
				<div className="flex gap-x-2">
					<SquarePen />
					<Trash2 />
				</div>
			</div>
		</div>
	);
}
