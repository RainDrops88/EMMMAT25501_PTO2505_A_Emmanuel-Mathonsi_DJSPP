import { useContext } from "react";
import { PodcastContext } from "../../context/PodcastContextStore";
import styles from "./Favorite.module.css";

/**
 * Reusable favorites UI:
 * - Badge when used in the header
 * - Episode list when used on the favorites page
 */
export default function FavoriteCard({ episodes, toggleEpisodeFavorite }) {
  const { favoriteEpisodesCount } = useContext(PodcastContext);

  const groupedEpisodes = Array.isArray(episodes)
    ? Object.values(
        episodes.reduce((groups, episode) => {
          const groupKey = episode.podcastTitle || "Unknown Podcast";

          if (!groups[groupKey]) {
            groups[groupKey] = {
              title: groupKey,
              image: episode.podcastImage,
              episodes: [],
            };
          }

          groups[groupKey].episodes.push(episode);
          return groups;
        }, {})
      )
    : [];

  if (!Array.isArray(episodes)) {
    return (
      <span className={styles.badge}>
        <span>Favorites ({favoriteEpisodesCount})</span>
      </span>
    );
  }

  if (!episodes.length) {
    return (
      <p className={styles.emptyFavorites}>
        No favorite episodes yet. Click the star on an episode to save it here.
      </p>
    );
  }

  return (
    <section className={styles.favoriteEpisodes}>
      {groupedEpisodes.map((group) => (
        <div key={group.title} className={styles.favoriteGroup}>
          <div className={styles.favoriteGroupHeader}>
            <img
              className={styles.favoriteGroupImage}
              src={group.image}
              alt={group.title}
            />
            <div>
              <h2 className={styles.favoriteGroupTitle}>{group.title}</h2>
              <p className={styles.favoriteGroupCount}>
                {group.episodes.length} favorite episode
                {group.episodes.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>

          {group.episodes.map((episode) => (
            <article key={episode.key} className={styles.favoriteEpisodeCard}>
              <img
                className={styles.favoriteEpisodeImage}
                src={episode.seasonImage || episode.podcastImage}
                alt={episode.episodeTitle}
              />

              <div className={styles.favoriteEpisodeInfo}>
                <h3>{episode.episodeTitle}</h3>
                <p className={styles.favoriteEpisodeMeta}>
                  Season {episode.seasonNumber} · Episode {episode.episodeNumber}
                </p>
                <p className={styles.favoriteEpisodeDescription}>
                  {episode.description}
                </p>
                <p className={styles.addedDate}>
                  Added on: {new Date(
                    episode.addedAt ?? episode.updated
                  ).toLocaleDateString()}
                </p>
                <audio controls className={styles.favoriteEpisodeAudio}>
                  <source src={episode.file} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>

              <div className={styles.favoriteEpisodeActions}>
                <button
                  type="button"
                  className={styles.favoriteEpisodeRemove}
                  onClick={() => toggleEpisodeFavorite(episode)}
                  aria-label={`Remove ${episode.episodeTitle} from favorites`}
                >
                  ★
                </button>
              </div>
            </article>
          ))}
        </div>
      ))}
    </section>
  );
}