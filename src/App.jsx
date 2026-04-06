import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/UI/Header";
import GlobalAudio from "./components/UI/GlobalAudio";
import Home from "./pages/Home";
import FavoritePage from "./pages/Favorite";
import ShowDetail from "./pages/ShowDetail";
import { AudioPlayerProvider } from "./context/AudioPlayerContext";
import { PodcastProvider } from "./context/PodcastContext";

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

/**
 * Root component of the Podcast Explorer app.
 *
 * - Wraps the application in the `PodcastProvider` context for global state.
 * - Includes the `Header` component, displayed on all pages.
 * - Defines client-side routes using React Router:
 *    - "/" renders the `Home` page
 *    - "/show/:id" renders the `ShowDetail` page for a specific podcast
 *
 * @returns {JSX.Element} The application component with routing and context.
 */
export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  return (
    <PodcastProvider>
      <AudioPlayerProvider>
        <Header theme={theme} onToggleTheme={handleToggleTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<FavoritePage />} />
          <Route path="/show/:id" element={<ShowDetail />} />
        </Routes>
        <GlobalAudio />
      </AudioPlayerProvider>
    </PodcastProvider>
  );
}
