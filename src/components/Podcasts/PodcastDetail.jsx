import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PodcastContext } from "../../context/PodcastContextStore";
import styles from "./PodcastDetail.module.css";
import { formatDate } from "../../utils/formatDate";
import GenreTags from "../UI/GenreTags";

export default function PodcastDetail({ podcast, genres }) {
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);
  const season = podcast.seasons[selectedSeasonIndex];
  const navigate = useNavigate();
  const { toggleEpisodeFavorite, isEpisodeFavorite } =
    useContext(PodcastContext);

  const buildEpisodeFavorite = (episode, episodeIndex) => ({
    key: `${podcast.id}-${selectedSeasonIndex}-${episodeIndex}`,
    podcastId: podcast.id,
    podcastTitle: podcast.title,
    podcastImage: podcast.image,
    seasonNumber: selectedSeasonIndex + 1,
    seasonTitle: season.title,
    seasonImage: season.image,
    episodeNumber: episodeIndex + 1,
    episodeTitle: episode.title,
    description: episode.description,
    file: episode.file,
    updated: podcast.updated,
    genres,
  });


  return (
    <div className={styles.container}>
      {/* Back Button */}
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* Header */}
      <div className={styles.header}>
        <img src={podcast.image} alt="Podcast Cover" className={styles.cover} />
        <div>
          <h1 className={styles.title}>{podcast.title}</h1>
          <p className={styles.description}>{podcast.description}</p>

          <div className={styles.metaInfo}>
            <div className={styles.seasonInfo}>
              <div>
                <p>Genres</p>
                <GenreTags genres={genres} />
              </div>

              <div>
                <p>Last Updated:</p>
                <strong>{formatDate(podcast.updated)}</strong>
              </div>

              <div>
                <p>Total Seasons:</p>
                <strong>{podcast.seasons.length} Seasons</strong>
              </div>

              <div>
                <p>Total Episodes:</p>
                <strong>
                  {podcast.seasons.reduce(
                    (acc, s) => acc + s.episodes.length,
                    0
                  )}{" "}
                  Episodes
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Season Details */}
      <div className={styles.seasonDetails}>
        <div className={styles.seasonIntro}>
          <div className={styles.left}>
            <img className={styles.seasonCover} src={season.image} />
            <div>
              <h3>
                Season {selectedSeasonIndex + 1}: {season.title}
              </h3>
              <p>{season.description}</p>
              <p className={styles.releaseInfo}>
                {season.episodes.length} Episodes
              </p>
            </div>
          </div>
          <select
            value={selectedSeasonIndex}
            onChange={(e) => setSelectedSeasonIndex(Number(e.target.value))}
            className={styles.dropdown}
          >
            {podcast.seasons.map((s, i) => (
              <option key={i} value={i}>
                Season {i + 1}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.episodeList}>
          {season.episodes.map((ep, index) => {
            const episodeIsFavorite = isEpisodeFavorite(
              podcast.id,
              selectedSeasonIndex,
              index
            );

            return (
              <div key={index} className={styles.episodeCard}>
                <img className={styles.episodeCover} src={season.image} alt="" />
                <div className={styles.episodeInfo}>
                  <p className={styles.episodeTitle}>
                    Episode {index + 1}: {ep.title}
                  </p>
                  <p className={styles.episodeDesc}>{ep.description}</p>
                  <audio controls className={styles.audioPlayer}>
                    <source src={ep.file} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
                <button
                  type="button"
                  className={`${styles.favoriteIcon} ${
                    episodeIsFavorite ? styles.favoriteActive : ""
                  }`}
                  onClick={() =>
                    toggleEpisodeFavorite(buildEpisodeFavorite(ep, index))
                  }
                  aria-label={
                    episodeIsFavorite
                      ? `Remove ${ep.title} from favorites`
                      : `Add ${ep.title} to favorites`
                  }
                >
                  {episodeIsFavorite ? "★" : "☆"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
