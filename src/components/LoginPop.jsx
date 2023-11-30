import React, { useState } from "react";
import Landing from "./Landing";
import Header from "./Header";
import Register from "./Register";

export default function LoginPop() {
	const [showLoginPopup, setShowLoginPopup] = useState(false);
	const [showRegisterPopup, setShowRgisterPopup] = useState(false);

	const toggleLoginPopup = () => {
		setShowLoginPopup(!showLoginPopup);
	};
	const toggleRegisterPopup = () => {
		setShowRgisterPopup(!showRegisterPopup);
	};

	return (
		<>
			<Header toggleLoginPopup={toggleLoginPopup} />
			<Landing
				toggleLoginPopup={toggleLoginPopup}
				showLoginPopup={showLoginPopup}
			/>
			<Landing
				toggleRegisterPopup={toggleRegisterPopup}
				showRegisterPopup={showRegisterPopup}
			/>
			<Register toggleLoginPopup={toggleLoginPopup} />
			<Login toggleRegisterPopup={toggleRegisterPopup} />
		</>
	);
}
