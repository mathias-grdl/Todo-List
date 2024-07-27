import useDebounce from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function SearchBar({
	handleFilterChange,
	setSearchTerm,
	searchTerm,
}) {
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	useEffect(() => {
		setSearchTerm(debouncedSearchTerm);
	}, [debouncedSearchTerm, setSearchTerm]);

	const handleChange = (e) => {
		const checked = e.target.checked;
		handleFilterChange(checked);
	};

	return (
		<div className="p-5 rounded-lg w-full mb-3 flex flex-col md:flex-row items-center justify-between gap-4">
			<label className="input input-bordered flex items-center gap-2 w-full">
				<input
					type="text"
					className="grow"
					placeholder="Search"
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<Search opacity={0.5} />
			</label>
			<label className="flex cursor-pointer gap-2">
				<span className="label-text">completed</span>
				<input
					type="checkbox"
					className="toggle theme-controller"
					onChange={handleChange}
				/>
			</label>
		</div>
	);
}
