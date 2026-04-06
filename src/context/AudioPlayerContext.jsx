import { createContext, useCallback, useMemo, useRef, useState } from "react";

export const AudioPlayerContext = createContext({
  episode: null,
  isPlaying: false,
  audioRef: { current: null },
  playEpisode: () => {},
  playNextEpisode: () => {},
  playPreviousEpisode: () => {},
  clearEpisode: () => {},
  handleAudioPlay: () => {},
  handleAudioPause: () => {},
  handleTrackEnded: () => {},
  hasNextEpisode: false,
  hasPreviousEpisode: false,
});

export function AudioPlayerProvider({ children }) {
  const [episode, setEpisode] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const currentEpisodeIndex = playlist.findIndex(
    (playlistEpisode) => playlistEpisode.key === episode?.key
  );

  const playEpisode = useCallback(
    (nextEpisode, queue = []) => {
      if (!nextEpisode) {
        return;
      }

      const isSameEpisode = episode?.key === nextEpisode.key;
      const audioElement = audioRef.current;

      if (isSameEpisode && audioElement) {
        if (audioElement.paused) {
          const playPromise = audioElement.play();
          playPromise?.catch(() => setIsPlaying(false));
          setIsPlaying(true);
        } else {
          audioElement.pause();
          setIsPlaying(false);
        }
        return;
      }

      const nextQueue =
        Array.isArray(queue) && queue.length
          ? queue
          : playlist.some(
              (playlistEpisode) => playlistEpisode.key === nextEpisode.key
            )
            ? playlist
            : [nextEpisode];

      const matchedEpisode =
        nextQueue.find(
          (playlistEpisode) => playlistEpisode.key === nextEpisode.key
        ) ?? nextEpisode;

      setPlaylist(nextQueue);
      setEpisode(matchedEpisode);
      setIsPlaying(true);
    },
    [episode, playlist]
  );

  const playPreviousEpisode = useCallback(() => {
    if (currentEpisodeIndex <= 0) {
      return;
    }

    setEpisode(playlist[currentEpisodeIndex - 1]);
    setIsPlaying(true);
  }, [currentEpisodeIndex, playlist]);

  const playNextEpisode = useCallback(() => {
    if (currentEpisodeIndex === -1 || currentEpisodeIndex >= playlist.length - 1) {
      setIsPlaying(false);
      return;
    }

    setEpisode(playlist[currentEpisodeIndex + 1]);
    setIsPlaying(true);
  }, [currentEpisodeIndex, playlist]);

  const clearEpisode = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    setEpisode(null);
    setPlaylist([]);
    setIsPlaying(false);
  }, []);

  const handleAudioPlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const handleAudioPause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleTrackEnded = useCallback(() => {
    if (currentEpisodeIndex > -1 && currentEpisodeIndex < playlist.length - 1) {
      setEpisode(playlist[currentEpisodeIndex + 1]);
      setIsPlaying(true);
      return;
    }

    setIsPlaying(false);
  }, [currentEpisodeIndex, playlist]);

  const hasPreviousEpisode = currentEpisodeIndex > 0;
  const hasNextEpisode =
    currentEpisodeIndex > -1 && currentEpisodeIndex < playlist.length - 1;

  const value = useMemo(
    () => ({
      episode,
      isPlaying,
      audioRef,
      playEpisode,
      playNextEpisode,
      playPreviousEpisode,
      clearEpisode,
      handleAudioPlay,
      handleAudioPause,
      handleTrackEnded,
      hasNextEpisode,
      hasPreviousEpisode,
    }),
    [
      episode,
      isPlaying,
      playEpisode,
      playNextEpisode,
      playPreviousEpisode,
      clearEpisode,
      handleAudioPlay,
      handleAudioPause,
      handleTrackEnded,
      hasNextEpisode,
      hasPreviousEpisode,
    ]
  );

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
}

export default AudioPlayerProvider;