import { useContext } from "react";
import { PodcastContext } from "../../context/PodcastContextStore";
import { AudioPlayerContext } from "../../context/AudioPlayerContext";
import styles from "./Favorite.module.css";

/**
 * Reusable favorites UI:
 * - Badge when used in the header
 * - Episode list when used on the favorites page
 */
export default function FavoriteCard({ episodes, toggleEpisodeFavorite }) {
  const { favoriteEpisodesCount } = useContext(PodcastContext);
  const { episode: activeEpisode, isPlaying, playEpisode } =
    useContext(AudioPlayerContext);

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

          {group.episodes.map((episode) => {
            const isCurrentEpisode = activeEpisode?.key === episode.key;
            const isEpisodePlaying = isCurrentEpisode && isPlaying;

            return (
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
                    ).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </p>
                  <button
                    type="button"
                    className={`${styles.favoriteEpisodePlay} ${
                      isEpisodePlaying ? styles.playing : ""
                    }`}
                    onClick={() => playEpisode(episode, episodes)}
                    aria-label={
                      isEpisodePlaying
                        ? `Pause ${episode.episodeTitle}`
                        : `Play ${episode.episodeTitle}`
                    }
                  >
                    {isEpisodePlaying
                      ? "⏸ Pause"
                      : isCurrentEpisode
                        ? "▶ Resume"
                        : "▶ Play"}
                  </button>
                </div>

                <div className={styles.favoriteEpisodeActions}>
                  <button
                    type="button"
                    className={styles.favoriteEpisodeRemove}
                    onClick={() => toggleEpisodeFavorite(episode)}
                    aria-label={`Remove ${episode.episodeTitle} from favorites`}
                  >
                    Remove
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ))}
    </section>
  );
}