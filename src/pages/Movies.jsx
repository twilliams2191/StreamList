import { useState } from 'react';

function Movies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const tmdbToken = import.meta.env.VITE_TMDB_TOKEN;

  const searchMovies = async () => {
    if (searchTerm.trim() === '') return;

    setLoading(true);
    setError('');
    setMovies([]);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          searchTerm
        )}`,
        {
          headers: {
            Authorization: `Bearer ${tmdbToken}`,
            accept: 'application/json',
          },
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Unable to retrieve movie data.');
      }

      const data = await response.json();
      setMovies(data.results || []);
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Request timed out. Please try again.');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-card movie-page">
      <h2>Movie Search</h2>
      <p>Search for movie information using the TMDB API.</p>

      <div className="input-group">
        <input
          type="text"
          placeholder="Search for a movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={searchMovies}>Search</button>
      </div>

      {loading && <p className="empty-message">Loading movies...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="movie-results">
        {movies.length === 0 && !loading && (
          <p className="empty-message">
            {searchTerm ? 'No movies found matching your search.' : 'Start searching for movies above.'}
          </p>
        )}
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <div className="poster-placeholder">No Image</div>
            )}

            <div className="movie-info">
              <h3>{movie.title}</h3>

              <p>
                <strong>Release Date:</strong>{' '}
                {movie.release_date || 'Not available'}
              </p>

              <p>
                <strong>Rating:</strong>{' '}
                {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
              </p>

              <p>{movie.overview || 'No overview available.'}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Movies;