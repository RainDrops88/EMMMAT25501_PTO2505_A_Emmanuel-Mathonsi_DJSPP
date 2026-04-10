import { Link } from "react-router-dom";
import logo from "../../assets/podcast icon.webp";
import styles from "./Header.module.css";
import Favorite from "../Filters/FavoriteCard";

export default function Header({ theme, onToggleTheme }) {
	const isDarkTheme = theme === "dark";

	return (
		<header className={styles.appHeader}>
			<div className={styles.brand}>
				<img className={styles.logo} src={logo} alt="" />
				<span>Podcast App</span>
			</div>
			<div className={styles.navLinks}>
				<Link to="/" className={styles.homeLink}>
					Home
				</Link>
				<Link to="/favorites" className={styles.favoriteLink}>
					<Favorite />
				</Link>
			</div>
			

			<button
				type="button"
				className={styles.themeToggle}
				onClick={onToggleTheme}
				aria-label={`Switch to ${isDarkTheme ? "light" : "dark"} mode`}
				aria-pressed={isDarkTheme}
			>
				<span className={styles.toggleIcon}>{isDarkTheme ? "☀️" : "🌙"}</span>
				<span className={styles.themeLabel}>
					{isDarkTheme ? "Light mode" : "Dark mode"}
				</span>
			</button>
		</header>
	);
}
