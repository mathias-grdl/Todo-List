import { useEffect } from "react";
import useDebounce from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import { alphanumericSpaceRegex } from "@/utils/Regex";
import Toast from "@/utils/Toast";

const SearchBar = ({ handleFilterChange, setSearchTerm, searchTerm }) => {
	const debouncedSearchTerm = useDebounce(searchTerm, 300);

	useEffect(() => {
		setSearchTerm(debouncedSearchTerm);
	}, [debouncedSearchTerm, setSearchTerm]);

	const handleChange = (e) => {
		handleFilterChange(e.target.checked);
	};

	const handleSearchChange = (e) => {
		const input = e.target.value;
		if (input === "" || alphanumericSpaceRegex.test(input)) {
			setSearchTerm(input);
		} else {
			Toast("error", "Only letters and numbers are allowed.");
		}
	};

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
};

export default SearchBar;
