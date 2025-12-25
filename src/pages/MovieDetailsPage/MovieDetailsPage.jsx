import { Suspense, useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";

import Button from "../../components/Button/Button";
import { fetchMovie } from "../../api/fetchMovies";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const location = useLocation();
  const goBackRef = useRef(location.state ?? "/movies");
  const { movieId } = useParams();
  const goToUrl = useNavigate();

  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getMovie() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchMovie(movieId);

        if (!data || Object.keys(data).length === 0) {
          throw new Error("Movie not found!");
        }
        setMovieDetails(data);
      } catch (error) {
        setError(error.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    getMovie();
  }, [movieId]);

  function handleGoBack() {
    goToUrl(goBackRef.current);
  }

  return (
    <div className={css.wrap}>
      {error && <ErrorMessage error={error} />}
      {!error && <MoonLoader color="#d15065" size="80px" loading={isLoading} />}
      {!isLoading && (
        <div className={css["btn-wrap"]}>
          <Button onClick={handleGoBack} text={"Go Back"} />
        </div>
      )}
      {!isLoading && !error && movieDetails && (
        <>
          <MovieDetails movie={movieDetails} />
          <Suspense
            fallback={
              <MoonLoader color="#d15065" size="80px" loading={isLoading} />
            }
          >
            <Outlet />
          </Suspense>
        </>
      )}
    </div>
  );
}
