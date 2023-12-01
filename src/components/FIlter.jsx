import React, { useState } from "react";
import "../styles/Filter.scss";

const Filter = ({ brands, colors, onFilterChange, onColorFilterChange }) => {
	const [noPaints, setNoPaints] = useState("");

	if (!(brands.length || colors.length)) {
		setNoPaints(<h3>No paints available.</h3>);
	}

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
			<div className="filterContainer__colorFilter">
				<button className="allBtn" onClick={() => onColorFilterChange("All")}>
					All
				</button>
				{colors.map((color, i) => (
					<div className={`btnRing${color}`} key={i}>
						<button
							key={i}
							className={color}
							onClick={() => onColorFilterChange(color)}
						></button>
					</div>
				))}
			</div>
			{noPaints}
		</>
	);
};

export default Filter;
