import { useCallback, useEffect, useState } from "react";
import { fetchPinturas } from "../service/pinturas";
import Login from "../components/Login";

export const usePinturas = () => {
	const [pinturas, setPinturas] = useState([]);

	const getPinturas = useCallback(
		async (username, fetchRandom = false, count = 5) => {
			try {
				const url = `http://localhost:3000/api/pinturas?username=${username}`;
				const paint = await fetchPinturas(url);

				if (!fetchRandom) {
					setPinturas(paint);
				} else {
					const shuffledPaintings = paint
						.slice()
						.sort(() => Math.random() - 0.5)
						.slice(0, count);

					setPinturas(shuffledPaintings);
				}
			} catch (e) {
				console.error("Error fetching paintings:", e);
				throw new Error(e);
			}
		},
		[]
	);

	const deletePintura = async (name) => {
		try {
			const response = await fetch(
				`http://localhost:3000/api/pinturas?name=${name}`,
				{
					method: "DELETE",
				}
			);
			if (!response.ok) {
				throw new Error(`Failed to delete pintura: ${response.status}`);
			}
			// After successful deletion, fetch the updated list of pinturas
			getPinturas();
		} catch (error) {
			console.error("Error deleting pintura:", error);
		}
	};

	const addPintura = async (paintData) => {
		const access_token = localStorage.getItem("token");
		console.log("Request Headers:", {
			Authorization: `Bearer ${access_token}`,
		});
		paintData.price = Number(paintData.price);
		try {
			const response = await fetch("http://localhost:3000/api/pinturas/new", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${access_token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(paintData),
			});

			if (!response.ok) {
				throw new Error(`Failed to add new pintura: ${response.status}`);
			}
			const newPaint = await response.json();

			setPinturas((prevPinturas) => [...prevPinturas, newPaint]);
			getPinturas();
		} catch (error) {
			console.error("Error adding new pintura:", error);
		}
	};

	useEffect(() => {
		getPinturas();
	}, []);

	return {
		getPinturas,
		setPinturas,
		pinturas,
		deletePintura,
		addPintura,
		Login,
	};
};
