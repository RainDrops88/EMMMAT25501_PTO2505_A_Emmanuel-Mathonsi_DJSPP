import PodcastCard from "./PodcastCard";
import { PodcastContext } from "../../context/PodcastContextStore";
import styles from "./PodcastGrid.module.css";
import { useContext } from "react";

/**
 * PodcastGrid Component
 *
 * Renders a responsive grid of podcast preview cards using filtered and paginated
 * podcast data from context. Each card displays a podcast’s metadata including
 * title, image, genres, season count, and last updated date.
 *
 * If the filtered list is empty, it displays a user-friendly "no results" message.
 *
 * @component
 * @param {Object} props - Component props
 * @param {{id: number, name: string}[]} props.genres - Array of genre definitions used to resolve genre IDs in each podcast
 *
 * @returns {JSX.Element} A grid of <PodcastCard> components or a message if no results are found
 */
export default function PodcastGrid({
  items,
  emptyMessage = "No podcasts match your search or filters.",
}) {
  const { podcasts } = useContext(PodcastContext);
  const displayPodcasts = items ?? podcasts;

  if (!displayPodcasts.length) {
    return <p className={styles.noResults}>{emptyMessage}</p>;
  }

  return (
    <div className={styles.grid}>
      {displayPodcasts.map((podcast) => (
        <PodcastCard key={podcast.id} podcast={podcast} />
      ))}
    </div>
  );
}
