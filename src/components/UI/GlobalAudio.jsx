import { useContext } from "react";
import styles from "./GlobalAudio.module.css";
import { AudioPlayerContext } from "../../context/AudioPlayerContext";
import { PodcastContext } from "../../context/PodcastContextStore";

export default function GlobalAudio() {
  const {
    episode,
    clearEpisode,
    audioRef,
    handleAudioPlay,
    handleAudioPause,
    handleTrackEnded,
    playNextEpisode,
    playPreviousEpisode,
    hasNextEpisode,
    hasPreviousEpisode,
  } = useContext(AudioPlayerContext);
  const { favoriteEpisodes, toggleEpisodeFavorite } =
    useContext(PodcastContext);

  if (!episode) {
    return null;
  }

  const isFavorite = favoriteEpisodes.some(
    (savedEpisode) => savedEpisode.key === episode.key
  );

  return (
    <aside className={styles.playerShell} aria-label="Global audio player">
      <article className={styles.audioPlayerCard}>
        <img
            className={styles.episodeImage}
            src={episode.seasonImage || episode.podcastImage}
            alt={episode.episodeTitle}
        />

        <div className={styles.episodeInfo}>
            <p className={styles.podcastTitle}>{episode.podcastTitle}</p>
            <h3>{episode.episodeTitle}</h3>
            <p className={styles.episodeMeta}>
                Season {episode.seasonNumber} · Episode {episode.episodeNumber}
            </p>
            <div className={styles.audioControls}>
            <button
            type="button"
            className={styles.controlButton}
            onClick={playPreviousEpisode}
            disabled={!hasPreviousEpisode}
            aria-label="Play previous track"
          >
            ⏮
          </button>
            <audio
                ref={audioRef}
                key={episode.key}
                controls
                autoPlay
                className={styles.episodeAudio}
                onPlay={handleAudioPlay}
                onPause={handleAudioPause}
                onEnded={handleTrackEnded}
            >
                <source src={episode.file} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <button
            type="button"
            className={styles.controlButton}
            onClick={playNextEpisode}
            disabled={!hasNextEpisode}
            aria-label="Play next track"
          >
            ⏭
          </button>
            </div>
        </div>

        <div className={styles.episodeActions}>
        
          
          <button
            type="button"
            className={styles.closeButton}
            onClick={clearEpisode}
            aria-label="Close global audio player"
          >
            X
          </button>
          <button
            type="button"
            className={styles.favoriteButton}
            onClick={() => toggleEpisodeFavorite(episode)}
            aria-label={
              isFavorite
                ? `Remove ${episode.episodeTitle} from favorites`
                : `Add ${episode.episodeTitle} to favorites`
            }
          >
            {isFavorite ? "★" : "☆"}
          </button>
        </div>
      </article>
    </aside>
  );
}