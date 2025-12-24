import { useEffect, useState } from "react";
import { fetchMoviesByQuery } from "../../api/fetchMovies";
import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { MoonLoader } from "react-spinners";
import Button from "../../components/Button/Button";

export default function MoviesPage() {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [movies, setMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setSearchQuery(query.trim());
    setMovies([]);
  }

  useEffect(() => {
    if (!searchQuery) return;

    async function searchMovies() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchMoviesByQuery(searchQuery, page);
        if (!data?.results?.length) {
          throw new Error("No movies found at the moment.");
        }

        setMovies((movies) => [...movies, ...data.results]);
        setTotalPages(data.total_pages);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    searchMovies();
  }, [searchQuery, page]);

  return (
    <>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            autoFocus
            placeholder="Search movie..."
            name="search"
            id="search"
          ></input>
        </form>
      </div>
      {movies.length > 0 && <MovieList movies={movies} />}
      {error && <ErrorMessage error={error} />}
      {!error && <MoonLoader color="#d15065" size="80px" loading={isLoading} />}
      {movies.length > 0 && page < totalPages && !isLoading && (
        <Button onClick={() => setPage((page) => page + 1)}>Show More</Button>
      )}
    </>
  );
}
