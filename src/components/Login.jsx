import { useState } from "react";
import { useUser } from "../UserContext";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.scss";

export default function Login() {
	const [user, setUser] = useState({ username: "", password: "" });

	const { loginUser, setLoginUser } = useUser();
	const navigate = useNavigate();

	async function handleClick(e) {
		e.preventDefault();
		try {
			console.log("Handling click...");

			const response = await fetch("http://localhost:3000/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(user),
			});

			console.log("Response received:", response);

			if (response.ok) {
				const data = await response.json();
				const token = data.access_token;
				const username = user.username;

				if (token) {
					localStorage.setItem("token", token);
					localStorage.setItem("username", username);
					console.log("Token received:", token);
					console.log(data);
					console.log(username);
					setLoginUser(user);
					if (username.toLowerCase() === "admin") {
						navigate("/adminpanel");
					} else {
						navigate("/pinturas");
					}
				} else {
					console.error("Token not found in response:", data);
				}
			} else {
				console.error("Server response not OK:", response);
			}
		} catch (error) {
			console.error("Error during login", error);
		}
	}

	function handleInput(e) {
		let userTemp = { ...user };

		userTemp[e.target.name] = e.target.value;

		setUser(userTemp);
	}
	return (
		<>
			<main>
				<div className="logContainer">
					<div className="logContainer__box">
						<h2>Inicia sesión</h2>

						<div className="logContainer__log">
							<form>
								<input
									onChange={handleInput}
									type="text"
									name="username"
									placeholder="user"
								/>
								<input
									onChange={handleInput}
									type="password"
									name="password"
									placeholder="password"
								/>
								<button onClick={handleClick}>Login</button>
							</form>
						</div>
						<div className="logBox">
							<p>¿No tienes cuenta?</p>
							<Link to={"/register"}>Crea una nueva</Link>
						</div>
					</div>
				</div>
			</main>

			{/* <p>{user.username}</p> */}
		</>
	);
}
