import React from "react";
import "../styles/PopUP.scss";

const PinturaPopup = ({ pintura, onClose, isFavorite, handleFavClick }) => {
	return (
		<div className="popup" /* style={{ background: pintura.colorDisplay }} */>
			<div className="popup-content">
				<div className="imgContainer">
					<img src={pintura.img} alt="" />
				</div>
				<div
					className="colorDisplay"
					style={{ background: pintura.colorDisplay }}
				></div>
				<h2>{pintura.name}</h2>
				<h3>{pintura.brand}</h3>
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
				<button onClick={onClose}>Close</button>
			</div>
		</div>
	);
};

export default PinturaPopup;
