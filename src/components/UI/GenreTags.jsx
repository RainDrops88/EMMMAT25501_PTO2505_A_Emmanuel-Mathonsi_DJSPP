import { useContext } from "react";
import { PodcastContext } from "../../context/PodcastContextStore";
import styles from "./GenreTags.module.css";

/**
 * GenreTags component.
 *
 * Displays a list of genre tags based on an array of genre IDs.
 * It maps each ID to its corresponding title using the fetched genre dataset.
 * Unrecognized IDs are labeled as "Unknown".
 *
 * @param {Object} props
 * @param {number[]} props.genres - An array of genre IDs to display as tags.
 *
 * @returns {JSX.Element} A styled list of genre tags.
 */
export default function GenreTags({ genres = [] }) {
  const { genres: genreMap = [] } = useContext(PodcastContext);

  const genreSpans = genres.map((id) => {
    const match = genreMap.find((genre) => genre.id === id);

    return (
      <span key={id} className={styles.tag}>
        {match ? match.title : `Unknown (${id})`}
      </span>
    );
  });

  return <div className={styles.tags}>{genreSpans}</div>;
}
