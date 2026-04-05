import { useContext } from "react";
import { PodcastContext } from "../../context/PodcastContext";
import PodcastCard from "../Podcasts/PodcastCard";
import styles from "./Carousel.module.css";

export default function Carousel() {
  const { podcasts } = useContext(PodcastContext);

  return (
    <section
      className={styles.section}
      aria-labelledby="recommended-shows-heading"
    >
      <div className={styles.header}>
        <div>
          
          <h2 id="recommended-shows-heading" className={styles.title}>
            Recommended Shows
          </h2>
        </div>

    
      </div>

      <div className={styles.track}>
        <button
            type="button"
            className={styles.navButton}
            onClick={() => scrollCarousel(-1)}
            aria-label="Scroll recommended shows left"
          >
            ←
          </button>
        {podcasts.map((podcast) => (
          <div key={podcast.id} className={styles.slide}>
            <PodcastCard podcast={podcast} />
          </div>

        ))}
        <button
            type="button"
            className={styles.navButton}
            onClick={() => scrollCarousel(1)}
            aria-label="Scroll recommended shows right"
          >
            →
          </button>
      </div>
    </section>
  );
}