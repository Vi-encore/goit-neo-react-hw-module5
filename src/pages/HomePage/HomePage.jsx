import { useState, useEffect } from "react";
import { MoonLoader } from "react-spinners";
import { fetchTrendingMovies } from "../../api/fetchMovies";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Button from "../../components/Button/Button";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadMovies() {
      try {
        setIsLoading(true);
        setError(null);
        setShowError(false);

        const data = await fetchTrendingMovies(page);
        if (!data?.results?.length) {
          throw new Error("No movies found at the moment.");
        }

        if (!ignore) {
          setMovies((prev) =>
            page === 1 ? data.results : [...prev, ...data.results]
          );
          setTotalPages(data.total_pages);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Something went wrong");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadMovies();

    return () => {
      ignore = true;
    };
  }, [page]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setShowError(true);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (page > 1 && !isLoading && movies.length > 0) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [movies, isLoading, page]);

  return (
    <div className={css.home}>
      <h1 className={css.header}>Trending today</h1>
      {movies.length > 0 && <MovieList movies={movies} />}

      {showError && <ErrorMessage error={error} />}

      {!error && !showError && (
        <MoonLoader color="#d15065" size="80px" loading={isLoading} />
      )}
      {movies.length > 0 && page < totalPages && !isLoading && !showError && (
        <Button
          onClick={() => setPage((page) => page + 1)}
          text={"Show More"}
        />
      )}
    </div>
  );
}
