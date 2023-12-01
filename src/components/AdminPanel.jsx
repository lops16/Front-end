import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/landing.scss";
import { usePinturas } from "../hooks/usePinturas";
import AddPintura from "./AddPintura";
import "../styles/adminPanel.scss";

export default function Admin() {
	const { getPinturas, pinturas, deletePintura, addPintura } = usePinturas();
	const [isFormVisible, setIsFormVisible] = useState(false);

	useEffect(() => {
		getPinturas();
	}, []);

	const handleDeleteClick = (name) => {
		deletePintura(name);
	};

	const handleAddPaintClick = () => {
		setIsFormVisible(true);
	};

	const handleFormClose = () => {
		setIsFormVisible(false);
	};

	const handleNewPaintSubmit = (formData) => {
		console.log("Submitting new paint:", formData);
		addPintura(formData);
	};

	return (
		<>
			<div className="pinturaContainerAdmin">
				{pinturas.map((pintura, i) => (
					<>
						<div key={i} className="pinturaContainer__card">
							<div className="adminControll">
								{/* <i className="bx bxs-pencil"></i> */}
								<i
									className="bx bxs-trash"
									onClick={() => handleDeleteClick(pintura.name)}
								></i>
							</div>
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
						</div>
					</>
				))}
				<div className="cardAdd">
					<i className="bx bx-plus" onClick={handleAddPaintClick}></i>
					{isFormVisible && (
						<AddPintura
							onSubmit={handleNewPaintSubmit}
							onClose={handleFormClose}
						/>
					)}
				</div>
			</div>
		</>
	);
}
