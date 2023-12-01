/* proyecto: uso de rutas(minimo 3), hooks, peticiones api, sass. Opcionales: custom hooks, organizacion de codigo */

import "./styles/App.scss";
import Header from "./components/Header";
import Login from "./components/Login";
import Pinturas from "./components/Pinturas";
import { UserProvider, useUser } from "./UserContext";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Register from "./components/Register";
import Texturas from "./components/Texturas";
import Usuarios from "./components/Usuarios";
import Admin from "./components/AdminPanel";
import Footer from "./components/Footer";

function App() {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearch = (value) => {
		setSearchTerm(value);
	};
	return (
		<>
			<UserProvider>
				<BrowserRouter>
					<Header onSearch={handleSearch} />
					<Routes>
						<Route path="/" element={<Landing />}></Route>
						<Route
							path="/pinturas"
							element={<Pinturas searchValue={searchTerm} />}
						></Route>
						<Route path="/texturas" element={<Texturas />}></Route>
						<Route path="/login" element={<Login />}></Route>
						<Route path="/register" element={<Register />}></Route>
						<Route path="/usuarios" element={<Usuarios />}></Route>
						<Route path="/adminpanel" element={<Admin />}></Route>
						{/* <Route path="*" element={<NotFound />}></Route> */}
					</Routes>
					<Footer />
				</BrowserRouter>
			</UserProvider>
		</>
	);
}

export default App;
