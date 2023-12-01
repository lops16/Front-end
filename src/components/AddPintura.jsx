import React, { useState } from "react";
import "../styles/AddPintura.scss";

const AddPintura = ({ onSubmit, onClose }) => {
	const [formData, setFormData] = useState({
		name: "",
		color: "",
		brand: "",
		paintType: "",
		img: "",
		price: 0,
		colorDisplay: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
		console.log("Form Data Updated:", formData);
	};

	const handleSubmit = () => {
		console.log("Form Data:", formData);
		onSubmit(formData);
		onClose();
		setFormData({
			name: "",
			color: "",
			brand: "",
			paintType: "",
			img: "",
			price: 0,
			colorDisplay: "",
		});
	};

	return (
		<div className="cardForm">
			{/* Form fields */}

			<input
				type="text"
				name="name"
				value={formData.name}
				placeholder="Paint Name"
				onChange={handleInputChange}
			/>
			<input
				type="text"
				name="color"
				value={formData.color}
				placeholder="Paint Color"
				onChange={handleInputChange}
			/>
			<input
				type="text"
				name="brand"
				value={formData.brand}
				placeholder="Paint Brand"
				onChange={handleInputChange}
			/>
			<input
				type="text"
				name="paintType"
				value={formData.paintType}
				placeholder="Paint Type"
				onChange={handleInputChange}
			/>
			<input
				type="text"
				name="img"
				value={formData.img}
				placeholder="Paint Img"
				onChange={handleInputChange}
			/>
			<input
				type="number"
				name="price"
				value={formData.price}
				placeholder="Paint Price"
				onChange={handleInputChange}
			/>
			<input
				type="text"
				name="colorDisplay"
				value={formData.colorDisplay}
				placeholder="Paint Color Code"
				onChange={handleInputChange}
			/>
			<button onClick={handleSubmit} className="btnAdd">
				Add Paint
			</button>
			<button onClick={onClose} className="btnCloseAdd">
				Cancel
			</button>
		</div>
	);
};

export default AddPintura;
