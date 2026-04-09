import { Link } from "react-router-dom";
import logo from "../../assets/podcast icon.webp";
import styles from "./Header.module.css";
import Favorite from "../Filters/FavoriteCard";

export default function Header({ theme, onToggleTheme }) {
	const isDarkTheme = theme === "dark";

	return (
		<header className={styles.appHeader}>
			<Link to="/" className={styles.brand}>
				<img className={styles.logo} src={logo} alt="" />
				<span>Podcast App</span>
			</Link>
			<Link to="/favorites" className={styles.favoriteLink}>
				<Favorite />
			</Link>

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
