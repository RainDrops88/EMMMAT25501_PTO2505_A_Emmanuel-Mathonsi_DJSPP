import { useCallback, useContext, useEffect, useRef } from "react";
import { PodcastContext } from "../../context/PodcastContextStore";
import PodcastCard from "../Podcasts/PodcastCard";
import styles from "./Carousel.module.css";

export default function Carousel() {
  const { allPodcasts } = useContext(PodcastContext);
  const trackRef = useRef(null);

  const scrollCarousel = useCallback((direction = 1) => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const firstSlide = track.querySelector(`.${styles.slide}`);
    const gap = Number.parseFloat(window.getComputedStyle(track).gap) || 16;
    const slideWidth = firstSlide
      ? firstSlide.getBoundingClientRect().width + gap
      : track.clientWidth * 0.8;
    const maxScrollLeft = Math.max(0, track.scrollWidth - track.clientWidth);
    const nextPosition = track.scrollLeft + slideWidth * direction;

    if (direction > 0 && nextPosition >= maxScrollLeft - 8) {
      track.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    if (direction < 0 && track.scrollLeft <= 8) {
      track.scrollTo({ left: maxScrollLeft, behavior: "smooth" });
      return;
    }

    track.scrollBy({
      left: slideWidth * direction,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (allPodcasts.length <= 1) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      scrollCarousel(1);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [allPodcasts.length, scrollCarousel]);

  if (!allPodcasts.length) {
    return null;
  }

  return (
    <section
      className={styles.section}
      aria-labelledby="recommended-shows-heading"
    >
      <div className={styles.header}>
        <h2 id="recommended-shows-heading" className={styles.title}>
          Recommended Shows
        </h2>
      </div>

      <div className={styles.carousel}>
        <button
          type="button"
          className={styles.navButton}
          onClick={() => scrollCarousel(-1)}
        >
          ←
        </button>

        <div ref={trackRef} className={styles.track}>
          {allPodcasts.map((podcast) => (
            <div key={podcast.id} className={styles.slide}>
              <PodcastCard podcast={podcast} />
            </div>
          ))}
        </div>

        <button
          type="button"
          className={styles.navButton}
          onClick={() => scrollCarousel(1)}
        >
          →
        </button>
      </div>
    </section>
  );
}