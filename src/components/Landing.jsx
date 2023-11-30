import { useEffect, useState } from "react";
import "../styles/landing.scss";
import { usePinturas } from "../hooks/usePinturas";
import Login from "./Login";
import Register from "./Register";

export default function Landing({}) {
	const { getPinturas, pinturas } = usePinturas();
	const [showRegisterPopup, setShowRgisterPopup] = useState(false);
	const [showLoginPopup, setShowLoginPopup] = useState(false);

	useEffect(() => {
		getPinturas(true, 5);
	}, []);

	const toggleRegisterPopup = () => {
		setShowRgisterPopup(!showRegisterPopup);
		setShowLoginPopup(false);
	};
	const toggleLoginPopup = () => {
		setShowLoginPopup(!showLoginPopup);
		setShowRgisterPopup(false);
	};

	return (
		<>
			<main>
				<div className="callAction">
					<div className="callRegister">
						<h2>Para ver y gestionar las pinturas unete a la web</h2>

						<button className="btnReg" onClick={toggleRegisterPopup}>
							Registrarme
						</button>

						<p>
							o si ya tienes cuenta{" "}
							<button onClick={toggleLoginPopup}>Haz login</button>
						</p>
					</div>
				</div>
				<div className="pinturaContainerLand">
					{pinturas.map((pintura, i) => (
						<div key={i} className="pinturaContainer__card">
							<div className="imgContainer">
								<img src={pintura.img} alt="" />
							</div>
							<div
								className="colorDisplay"
								style={{ background: pintura.colorDisplay }}
							></div>
							<h2>{pintura.name}</h2>
							<h3>{pintura.brand}</h3>
						</div>
					))}
				</div>
				<div className="loginPop">{showLoginPopup && <Login />}</div>
				<div className="loginReg">{showRegisterPopup && <Register />}</div>
			</main>
		</>
	);
}
