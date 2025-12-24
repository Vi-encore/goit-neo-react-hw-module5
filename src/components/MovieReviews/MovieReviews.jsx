import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../api/fetchMovies";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { MoonLoader } from "react-spinners";
import Button from "../Button/Button";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function getReviews() {
      try {
        setIsLoading(true);
        setError(null);
        setShowError(false);

        const data = await fetchMovieReviews(movieId, page);
        if (!data || data.results.length === 0) {
          throw new Error("There are no reviews for this movie!");
        }
        if (!ignore) {
          setMovieReviews(data.results);
          setPage(data.page);
          setTotalPages(data.total_page);
        }
      } catch (error) {
        setError(error.message || "Something gone wrong!");
      } finally {
        setIsLoading(false);
      }
    }

    getReviews();

    return () => {
      ignore = true;
    };
  }, [movieId, page]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setShowError(true);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className={css.wrap}>
      {!error && !showError && (
        <MoonLoader color="#d15065" size="80px" loading={isLoading} />
      )}
      {showError && <ErrorMessage error={error} />}
      {movieReviews.length > 0 && (
        <ul className={css["reviews-list"]}>
          {movieReviews.map(({ author, content, id }) => (
            <li key={id} className={css["review-item"]}>
              <h4>Author: {author}</h4>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
      {movieReviews.length > 0 &&
        page < totalPages &&
        !isLoading &&
        !showError && (
          <Button onClick={() => setPage((page) => page + 1)}>Show More</Button>
        )}
    </div>
  );
}
