import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../UserContext";
import "../styles/Register.scss";

export default function Register() {
	const { setLoginUser } = useUser();
	const [newUser, setNewUser] = useState({
		mail: "",
		username: "",
		password: "",
	});
	const [welcomeMessage, setWelcomeMessage] = useState("");
	const [formVisible, setFormVisible] = useState(true);
	const navigate = useNavigate();

	function handleInput(e) {
		setNewUser((prevUser) => ({
			...prevUser,
			[e.target.name]: e.target.value,
		}));
	}

	async function handleClick(e) {
		e.preventDefault();
		const { mail, ...userDataWithoutEmail } = newUser;
		try {
			const response = await fetch("http://localhost:3000/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userDataWithoutEmail),
			});

			if (response.ok) {
				try {
					console.log("Handling click...");

					const response = await fetch("http://localhost:3000/api/auth/login", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(newUser),
					});

					console.log("Response received:", response);

					if (response.ok) {
						const data = await response.json();
						const token = data.access_token;
						const username = newUser.username;

						if (token) {
							localStorage.setItem("token", token);
							localStorage.setItem("username", username);
							console.log("Token received:", token);
							console.log(data);
							console.log(username);
							setLoginUser(newUser);
							setWelcomeMessage(
								`Bienvenido a Colorlog, ${username}! ya puedes comenzar a crear tu biblioteca.`
							);
							setTimeout(() => {
								navigate("/pinturas");
							}, 5000);
							setFormVisible(false);
						} else {
							console.error("Token not found in response:", data);
						}
					} else {
						console.error("Server response not OK:", response);
					}
				} catch (error) {
					console.error("Error during login", error);
				}
				console.log("User registered successfully");
			} else {
				console.error("Registration failed:", response.status);
			}
		} catch (error) {
			console.error("Error during registration:", error);
		}
	}

	return (
		<>
			<main>
				<div className="regContainer">
					<div className="regContainer__box">
						<div className="welcome">{welcomeMessage}</div>
						{formVisible && <h2>Registrate</h2>}

						<div className="regContainer__reg">
							{formVisible && (
								<>
									<form>
										<input
											onChange={handleInput}
											type="text"
											name="mail"
											placeholder="email"
										/>
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
										<button onClick={handleClick}>Register</button>
									</form>
								</>
							)}
						</div>
						{formVisible && (
							<div className="logBox">
								<p>¿Ya tienes cuenta?</p>

								<Link to={"/login"}>haz login</Link>
							</div>
						)}
					</div>
				</div>
			</main>
		</>
	);
}
