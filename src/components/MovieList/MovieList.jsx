import { Link, useLocation } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import css from './MovieList.module.css'

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css['movie-list']}>
      {movies.map((movie) => (
        <li key={movie.id} className={css['movie-item']}>
          <Link to={`/movies/${movie.id}`} state={location}>
            <MovieCard title={movie.title} image={movie.poster_path} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
