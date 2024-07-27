import React, { useEffect, useCallback, memo } from "react";
import useDebounce from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import Toast from "@/utils/Toast";
import { alphanumericSpaceRegex } from "@/utils/Regex";

const SearchBar = memo(({ handleFilterChange, setSearchTerm, searchTerm }) => {
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	useEffect(() => {
		setSearchTerm(debouncedSearchTerm);
	}, [debouncedSearchTerm, setSearchTerm]);

	const handleChange = useCallback(
		(e) => {
			handleFilterChange(e.target.checked);
		},
		[handleFilterChange]
	);

	const handleSearchChange = useCallback(
		(e) => {
			const input = e.target.value;
			if (input === "" || alphanumericSpaceRegex.test(input)) {
				setSearchTerm(input);
			} else {
				Toast("error", "Only letters and numbers are allowed.");
			}
		},
		[setSearchTerm]
	);

	return (
		<div className="p-5 rounded-lg w-full mb-3 flex flex-col md:flex-row items-center justify-between gap-4">
			<label className="input input-bordered flex items-center gap-2 w-full">
				<input
					type="text"
					className="grow"
					placeholder="Search"
					onChange={handleSearchChange}
					value={searchTerm}
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
});

SearchBar.displayName = "SearchBar";

export default SearchBar;
