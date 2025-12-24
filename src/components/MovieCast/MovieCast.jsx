import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../api/fetchMovies";
import { MoonLoader } from "react-spinners";

import css from "./MovieCast.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function MovieCast() {
  const { movieId } = useParams();

  const [movieCast, setMovieCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getCast() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchMovieCast(movieId);
        if (!data || !Array.isArray(data.cast)) {
          throw new Error("There are no data available about cast!");
        }

        setMovieCast(data.cast);
      } catch (error) {
        setError(error.message || "Something gone wrong!");
      } finally {
        setIsLoading(false);
      }
    }

    getCast();
  }, [movieId]);

  return (
    <div className={css["cast-wrap"]}>
      {!error && <MoonLoader color="#d15065" size="80px" loading={isLoading} />}
      {error && <ErrorMessage error={error} />}
      {!error && !isLoading && (
        <ul className={css['cast-list']}>
          {movieCast.map(({ id, character, name, profile_path }) => (
            <li key={id} className={css['cast-item']}>
              <div className={css['img-wrap']}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                  alt={`${name} as ${character}`}
                />
              </div>
              <h4 className={css.text}>{name}</h4>
              <p className={css.text}>Character: {character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
