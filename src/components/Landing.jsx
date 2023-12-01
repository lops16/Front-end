import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/landing.scss";
import { usePinturas } from "../hooks/usePinturas";

export default function Landing() {
	const { getPinturas, pinturas } = usePinturas();

	useEffect(() => {
		getPinturas(true, 5);
	}, []);

	return (
		<>
			<main>
				<div className="landingContainer">
					<div className="callAction">
						<div className="callAction__callRegister">
							<h1>Bienvenido Colorlog</h1>
							<p>
								La creciente web para los aficionados del modelismo, donde
								podrás agregar a tu biblioteca la pinturas que ya tengas a tu
								catálogo online, ver el precio, el color y donde comprarlas.
								Únete ya.
							</p>
							<Link to={"/register"}>
								<button className="btnReg">Registrarme</button>
							</Link>

							<p>
								o si ya tienes cuenta <Link to={"/login"}>haz login</Link>
							</p>
						</div>
					</div>
					<div className="pinturaContainerLand">
						{pinturas.map((pintura, i) => (
							<div key={i} className="pinturaContainerLand__card">
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
				</div>
			</main>
		</>
	);
}
