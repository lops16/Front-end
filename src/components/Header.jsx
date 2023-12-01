import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import "../styles/Header.scss";

export default function Header({ onSearch }) {
	let location = useLocation();
	let navigate = useNavigate();

	const { loginUser, setLoginUser } = useUser();
	function handleLogout() {
		localStorage.removeItem("token");
		setLoginUser(null);
		navigate("/");
	}
	const handleSearch = (e) => {
		onSearch(e.target.value);
	};
	return (
		<header>
			<div className="logo">
				<Link to={loginUser ? "/pinturas" : "/"}>
					<img src="../../public/Colorlog-logo.png" alt="Your Logo Alt Text" />
				</Link>{" "}
			</div>
			<div className="searchContainer">
				<input
					type="text"
					placeholder="Buscar pinturas"
					onChange={handleSearch}
				/>
			</div>
			<div className="logMenu">
				{loginUser !== null ? (
					<>
						<div className="userMenu">
							<Link
								to={
									loginUser.username === "admin" ? "/adminPanel" : "/usuarios"
								}
							>
								<i className="bx bx-user"></i>
							</Link>
							<h4>{loginUser.username} </h4>
							<i className="bx bx-log-out-circle" onClick={handleLogout}></i>
						</div>
					</>
				) : location.pathname === "/" ? (
					<>
						<Link to={loginUser ? "/usuarios" : "/login"}>
							<div className="userMenu">
								<i className="bx bx-user"></i>
								<h4>Login</h4>
							</div>
						</Link>
					</>
				) : !location.pathname.includes("login") ? (
					<>
						<Link to={loginUser ? "/usuarios" : "/login"}>
							<div className="userMenu">
								<i className="bx bx-user"></i>
								<h4>Login</h4>
							</div>
						</Link>
					</>
				) : null}
			</div>
			<nav>
				<ul>
					<li>
						<Link to={loginUser ? "/pinturas" : "/login"}>Pinturas</Link>
					</li>
					<li>
						<Link to={loginUser ? "/texturas" : "/login"}>Texturas</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}
