import React from "react";

const Filter = ({ brands, colors, onFilterChange, onColorFilterChange }) => {
	return (
		<>
			<div>
				<select onChange={(e) => onFilterChange(e.target.value)}>
					<option value="All">Todas las pinturas</option>
					{brands.map((brand) => (
						<option key={brand} value={brand}>
							{brand}
						</option>
					))}
				</select>
			</div>
			<div>
				<button onClick={() => onColorFilterChange("All")}>All</button>
				{colors.map((color, index) => (
					<button key={index} onClick={() => onColorFilterChange(color)}>
						{color}
					</button>
				))}
			</div>
		</>
	);
};

export default Filter;
