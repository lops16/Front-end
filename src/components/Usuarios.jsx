import React, { useEffect, useState } from "react";

const UserComponent = ({ username }) => {
	const [favoritePaints, setFavoritePaints] = useState([]);
	const [printFavPaints, setPrintFavPaints] = useState([]);

	useEffect(() => {
		const access_token = localStorage.getItem("token");
		const username = localStorage.getItem("username");

		const fetchFavoritePaints = async () => {
			try {
				const response = await fetch(
					`http://localhost:3000/api/users/${username}`,
					{
						method: "GET",
						headers: {
							Authorization: `Bearer ${access_token}`,
							"Content-Type": "application/json",
						},
					}
				);
				console.log(response.headers.get("Content-Type"));

				if (!response.ok) {
					throw new Error(
						`Failed to fetch favorite paints (${response.status})`
					);
				}
				console.log(response);
				const responseData = await response.json();
				const { paint } = responseData;
				console.log(paint);
				setFavoritePaints(paint);
				await printFavoritos(paint);
			} catch (error) {
				console.error("Error fetching favorite paints:", error);
			}
		};

		const printFavoritos = async (paintsFav) => {
			try {
				/* await fetchFavoritePaints(); */
				console.log(favoritePaints);
				const response = await fetch("http://localhost:3000/api/pinturas/fav", {
					method: "POST",
					headers: {
						Authorization: `Bearer ${access_token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify(paintsFav),
				});
				const responseData = await response.json();
				console.log("Response Data:", responseData);
				setPrintFavPaints(responseData);
			} catch (error) {
				console.error("Error fetching favorite paints:", error);
			}
		};

		fetchFavoritePaints();
	}, [username]);

	return (
		<>
			<div className="pinturaContainerUser">
				{printFavPaints.map((pintura, i) => (
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
		</>
	);
};

export default UserComponent;

/* Viejo */

/* import React, { useEffect, useState } from "react";

const UserComponent = ({ username }) => {
	const [favoritePaints, setFavoritePaints] = useState([]);

	useEffect(() => {
		const access_token = localStorage.getItem("token");
		const username = localStorage.getItem("username");

		const fetchFavoritePaints = async () => {
			try {
				const response = await fetch(
					`http://localhost:3000/api/users/${username}`,
					{
						method: "GET",
						headers: {
							Authorization: `Bearer ${access_token}`,
							"Content-Type": "application/json",
						},
					}
				);
				console.log(response.headers.get("Content-Type"));

				if (!response.ok) {
					throw new Error(
						`Failed to fetch favorite paints (${response.status})`
					);
				}
				console.log(response);
				const responseData = await response.json();
				const { paint } = responseData;
				console.log(paint);
				setFavoritePaints(paint);
			} catch (error) {
				console.error("Error fetching favorite paints:", error);
			}
		};

		fetchFavoritePaints();
	}, [username]);

	return (
		<>
			<div className="pinturaContainerLand">
				{favoritePaints.map((pintura, i) => (
					<div key={i} className="pinturaContainer__card">
						{console.log(pintura)}
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
		</>
	);
};

export default UserComponent; */
