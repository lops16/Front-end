import React from "react";
import "../styles/PopUP.scss";

const PinturaPopup = ({ pintura, onClose, isFavorite, handleFavClick }) => {
	return (
		<div className="popup" /* style={{ background: pintura.colorDisplay }} */>
			<div className="popup-content">
				<div
					className="popup-content__favBtnContainer"
					onClick={(e) => handleFavClick(e, pintura._id)}
				>
					{isFavorite(pintura._id) ? (
						<i className="bx bxs-bookmark"></i>
					) : (
						<i className="bx bx-bookmark"></i>
					)}
				</div>
				<div className="popup-content__imgContainer">
					<img src={pintura.img} alt="" />
				</div>
				<div
					className="popup-content__colorDisplay"
					style={{ background: pintura.colorDisplay }}
				></div>

				<div className="popup-content__info">
					<h2>{pintura.name}</h2>
					<h3>{pintura.brand}</h3>
					<h3>{pintura.paintType}</h3>
					<h4>{pintura.price} €</h4>
				</div>

				<button onClick={onClose}>X</button>
			</div>
		</div>
	);
};

export default PinturaPopup;
