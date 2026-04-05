import {
  SortSelect,
  Loading,
  Error,
} from "../components";
import FavoriteCard from "../components/Filters/FavoriteCard";
import { useContext } from "react";
import styles from "./Home.module.css";
import { PodcastContext } from "../context/PodcastContext";

/**
 * Favorites page for saved podcast episodes.
 *
 * @returns {JSX.Element} A filtered list of the user's favorite episodes.
 */
export default function FavoritePage() {
  const {
    loading,
    error,
    sortKey,
    favoriteEpisodes,
    toggleEpisodeFavorite,
  } = useContext(PodcastContext);

  const sortedFavorites = [...favoriteEpisodes]
    .sort((a, b) => {
      switch (sortKey) {
        case "title-asc":
          return a.episodeTitle.localeCompare(b.episodeTitle);
        case "title-desc":
          return b.episodeTitle.localeCompare(a.episodeTitle);
        case "date-asc":
          return new Date(a.updated) - new Date(b.updated);
        case "date-desc":
          return new Date(b.updated) - new Date(a.updated);
        default:
          return 0;
      }
    });

  return (
    <main className={styles.main}>
      <section className={styles.controls}>
        <SortSelect />
      </section>

      {loading && <Loading message="Loading your favorite episodes..." />}
      {error && (
        <Error message={`Error occurred while fetching podcasts: ${error}`} />
      )}

      {!loading && !error && (
        <FavoriteCard
          episodes={sortedFavorites}
          toggleEpisodeFavorite={toggleEpisodeFavorite}
        />
      )}
    </main>
  );
}
