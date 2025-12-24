import { useEffect, useState } from "react";
import { fetchMoviesByQuery } from "../../api/fetchMovies";
import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { MoonLoader } from "react-spinners";
import Button from "../../components/Button/Button";
import { useSearchParams } from "react-router-dom";

import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [movies, setMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const query = searchParams.get("query") || "";

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newQuery = formData.get("query");

    if (newQuery) {
      setMovies([]);
      setPage(1);
      setSearchParams({ query: newQuery });
    } else {
      setSearchParams({});
    }
  }
  useEffect(() => {
    if (!query) return;

    let ignore = false;

    async function searchMovies() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchMoviesByQuery(query, page);
        if (!data?.results?.length) {
          throw new Error("No movies found at the moment.");
        }

        if (!ignore) {
          setMovies((movies) => [...movies, ...data.results]);
          setTotalPages(data.total_pages);
        }
      } catch (error) {
        if (!ignore) {
          setError(error.message);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    searchMovies();

    return () => {
      ignore = true;
    };
  }, [query, page]);

  useEffect(() => {
    if (page > 1 && !isLoading && movies.length > 0) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [movies, isLoading, page]);

  return (
    <div className={css.wrap}>
      <form onSubmit={(e) => handleSubmit(e)} className={css["search-form"]}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movie..."
          name="query"
          id="query"
          className={css["search-input"]}
        ></input>
      </form>

      {movies.length > 0 && <MovieList movies={movies} />}
      {error && <ErrorMessage error={error} />}
      {!error && <MoonLoader color="#d15065" size="80px" loading={isLoading} />}
      {movies.length > 0 && page < totalPages && !isLoading && (
        <Button onClick={() => setPage((page) => page + 1)}>Show More</Button>
      )}
    </div>
  );
}
