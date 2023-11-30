import React from "react";

const PinturaCard = ({
	pintura,
	handleCardClick,
	isFavorite,
	handleFavClick,
}) => {
	return (
		<div
			className="pinturaContainer__card"
			onClick={() => handleCardClick(pintura)}
		>
			<div className="imgContainer">
				<img src={pintura.img} alt="" />
			</div>
			<div
				className="colorDisplay"
				style={{ background: pintura.colorDisplay }}
			></div>
			<h2>{pintura.name}</h2>
			<h3>{pintura.brand} | </h3>
			<h3>{pintura.paintType}</h3>
			<h4>{pintura.price} €</h4>
			<div
				className="favBtnContainer"
				onClick={(e) => handleFavClick(e, pintura._id)}
			>
				{isFavorite(pintura._id) ? (
					<i className="bx bxs-bookmark"></i>
				) : (
					<i className="bx bx-bookmark"></i>
				)}
			</div>
		</div>
	);
};

export default PinturaCard;
