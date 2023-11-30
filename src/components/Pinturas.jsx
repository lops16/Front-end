import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import PinturaPopup from "./PopUP";
import Filter from "./Filter";
import PinturaCard from "./PinturaCard";
import "../styles/Pinturas.scss";

// Constants
const API_BASE_URL = "http://localhost:3000/api";
const USER_API_URL = `${API_BASE_URL}/users`;
const PINTURAS_API_URL = `${API_BASE_URL}/pinturas`;

const Pinturas = ({ searchValue }) => {
	// State
	const [pinturas, setPinturas] = useState([]);
	const [visiblePinturas, setVisiblePinturas] = useState();
	const [sortedPinturas, setSortedPinturas] = useState([]);
	const [userFavorites, setUserFavorites] = useState([]);
	const [favoritesFetched, setFavoritesFetched] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [selectedPintura, setSelectedPintura] = useState(null);
	const [isPopupVisible, setIsPopupVisible] = useState(false);
	const [brandFilter, setBrandFilter] = useState([]);
	const [colorFilter, setColorFilter] = useState([]);
	const navigate = useNavigate();

	// Fetch User Favorites
	useEffect(() => {
		const access_token = localStorage.getItem("token");
		const username = localStorage.getItem("username");

		const fetchUserFavorites = async () => {
			try {
				const response = await fetch(`${USER_API_URL}/${username}`, {
					method: "GET",
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
				});

				if (!response.ok) {
					throw new Error(`Failed to fetch user favorites: ${response.status}`);
				}

				const favoritesData = await response.json();
				setUserFavorites(favoritesData.paint);
				setFavoritesFetched(true);
			} catch (error) {
				console.error("Error fetching user favorites:", error);
			}
		};

		if (access_token && username && !favoritesFetched) {
			fetchUserFavorites();
		}
	}, [favoritesFetched]);

	// Fetch Pinturas and Apply Filters
	useEffect(() => {
		const access_token = localStorage.getItem("token");

		if (access_token) {
			let url = PINTURAS_API_URL;

			if (brandFilter.length > 0 && colorFilter.length > 0) {
				url += `/marcaycolor/${brandFilter.join("+")}/${colorFilter.join("+")}`;
			} else {
				if (brandFilter.length > 0) {
					url += `/marca/${brandFilter.join("+")}`;
				}

				if (colorFilter.length > 0) {
					url += `/color/${colorFilter.join("+")}`;
				}
			}

			fetch(url, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			})
				.then((res) => res.json())
				.then((res) => {
					const sortedPinturas = res.sort((a, b) => {
						if (typeof a.brand === "string" && typeof b.brand === "string") {
							return a.brand.localeCompare(b.brand);
						}
						return 0;
					});

					setSortedPinturas(sortedPinturas);
				})
				.catch((error) => {
					console.error("Error fetching pinturas:", error);
				});
		} else {
			console.error("Access token not found.");
			navigate("/login");
		}
	}, [brandFilter, colorFilter]);

	useEffect(() => {
		const filteredPinturas = sortedPinturas.filter(
			(pintura) =>
				(brandFilter.length === 0 || brandFilter.includes(pintura.brand)) &&
				(colorFilter.length === 0 || colorFilter.includes(pintura.color)) &&
				pintura.name.toLowerCase().includes(searchValue.toLowerCase())
		);

		setPinturas(filteredPinturas.slice(0, visiblePinturas));
	}, [sortedPinturas, brandFilter, searchValue, visiblePinturas]);

	// Memoized Filtered Pinturas
	const searchedPinturas = useMemo(() => {
		return sortedPinturas.filter((pintura) =>
			pintura.name.toLowerCase().includes(searchValue.toLowerCase())
		);
	}, [searchValue, sortedPinturas]);

	// Memoized Unique Brands
	const uniqueBrands = useMemo(() => {
		const brandsSet = new Set(sortedPinturas.map((pintura) => pintura.brand));
		return Array.from(brandsSet);
	}, [sortedPinturas]);

	// Check if Pintura is a Favorite
	const isFavorite = (paintId) => {
		return userFavorites.includes(paintId);
	};

	// Handle Favorite Click
	const handleFavClick = (e, paintId) => {
		const access_token = localStorage.getItem("token");
		const username = localStorage.getItem("username");
		e.stopPropagation();

		if (access_token) {
			const method = isFavorite(paintId) ? "removepaint" : "addpaint";

			fetch(`${USER_API_URL}/${username}/${method}`, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${access_token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ paint: paintId }),
			})
				.then((res) => res.json())
				.then((res) => {
					console.log(
						`Paint ${
							method === "addpaint" ? "added to" : "removed from"
						} favorites:`,
						res
					);
					setUserFavorites(res.paint);
				})
				.catch((error) => {
					console.error(
						`Error ${
							method === "addpaint" ? "adding" : "removing"
						} paint from favorites:`,
						error
					);
				});
		} else {
			console.error("Access token not found.");
			navigate("/login");
		}
	};

	// Handle Filter Change
	const handleFilterChange = (brand) => {
		setBrandFilter((prevFilters) => {
			if (brand === "All") {
				return [];
			}
			const updatedFilters = prevFilters.includes(brand)
				? prevFilters.filter((filter) => filter !== brand)
				: [brand];

			return updatedFilters;
		});
	};

	const handleColorFilterChange = (color) => {
		setColorFilter((prevFilters) => {
			if (color === "All") {
				return [];
			}
			const updatedFilters = prevFilters.includes(color)
				? prevFilters.filter((filter) => filter !== color)
				: [color];

			return updatedFilters;
		});
	};

	// Handle Scroll
	const handleScroll = () => {
		const scrolled = document.documentElement.scrollTop;
		setIsVisible(scrolled > 300); // You can adjust the scroll threshold
	};

	// Scroll to Top
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	// Add Scroll Event Listener
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	// Handle Card Click
	const handleCardClick = (pintura) => {
		setSelectedPintura(pintura);
		setIsPopupVisible(true);
	};

	return (
		<>
			<main>
				<div className="filterContainer">
					<Filter
						brands={uniqueBrands}
						colors={["Red", "Green"]}
						onFilterChange={handleFilterChange}
						onColorFilterChange={handleColorFilterChange}
					/>
				</div>

				<div className="pinturaContainer">
					{pinturas.map((pintura, i) => (
						<PinturaCard
							key={i}
							pintura={pintura}
							handleCardClick={handleCardClick}
							isFavorite={isFavorite}
							handleFavClick={handleFavClick}
						/>
					))}
				</div>
				<div>
					{isVisible && (
						<button className="scroll-to-top-button" onClick={scrollToTop}>
							<i className="bx bx-chevron-up"></i>
						</button>
					)}
				</div>

				{isPopupVisible && (
					<PinturaPopup
						pintura={selectedPintura}
						onClose={() => setIsPopupVisible(false)}
						isFavorite={isFavorite}
						handleFavClick={handleFavClick}
					/>
				)}
			</main>
		</>
	);
};

export default Pinturas;
