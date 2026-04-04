/**
 * @function fetchPodcasts
 * Asynchronously fetches podcast data from the remote API and updates state accordingly.
 * Handles loading, error, and successful data response via provided state setters.
 *
 * @param {Function} setPodcasts - State setter function to update the podcasts array.
 * @param {Function} setError - State setter function to update the error message (string).
 * @param {Function} setLoading - State setter function to toggle the loading state (boolean).
 *
 * @returns {Promise<void>} A promise that resolves when the fetch process completes.
 *
 **/
export async function fetchPodcasts(setPodcasts, setError, setLoading) {
  try {
    const res = await fetch("https://podcast-api.netlify.app");
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    setPodcasts(data);
  } catch (err) {
    console.error("Failed to fetch podcasts:", err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
}

export async function fetchSinglePodcast(id, setPodcast, setError, setLoading) {
  try {
    const res = await fetch(`https://podcast-api.netlify.app/id/${id}`);
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    setPodcast(data);
  } catch (err) {
    console.error("Failed to fetch podcasts:", err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
}

/**
 * @function fetchGenreById
 * Fetches genre data from the podcast API using a genre ID.
 *
 * @param {string | number} genreId - The genre ID to fetch.
 * @returns {Promise<object>} A promise that resolves to the genre payload.
 */
export async function fetchGenreById(genreId) {
  if (genreId === undefined || genreId === null || genreId === "") {
    throw new Error("A valid genre ID is required.");
  }

  const res = await fetch(`https://podcast-api.netlify.app/genre/${genreId}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch genre ${genreId}: ${res.status}`);
  }

  return res.json();
}

/**
 * Fetches a unique list of genres from an array of genre IDs.
 *
 * @param {(string | number)[]} genreIds - List of genre IDs to resolve.
 * @returns {Promise<object[]>} A promise that resolves to the fetched genre objects.
 */
export async function fetchGenresByIds(genreIds = []) {
  const uniqueIds = [...new Set(genreIds)].filter(
    (id) => id !== undefined && id !== null && id !== ""
  );

  const genres = await Promise.all(
    uniqueIds.map(async (id) => {
      try {
        return await fetchGenreById(id);
      } catch (err) {
        console.error(`Failed to fetch genre ${id}:`, err);
        return null;
      }
    })
  );

  return genres.filter(Boolean);
}

