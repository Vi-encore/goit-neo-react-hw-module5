import { useState, useEffect } from "react";
import { fetchTrendingMovies } from "../../api/fetchMovies";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadMovies() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchTrendingMovies(page);
        if (!ignore) {
          console.log(data);
          setMovies((prev) =>
            page === 1 ? data.results : [...prev, ...data.results]
          );
          setTotalPages(data.total_pages);
        }
      } catch (error) {
        if (!ignore) {
          console.log(error);
          setError(error);
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadMovies();

    return () => {
      ignore = true; 
    };
  }, [page]);

  return (
    <>
      Home
      <MovieList movies={movies} />
    </>
  );
}
