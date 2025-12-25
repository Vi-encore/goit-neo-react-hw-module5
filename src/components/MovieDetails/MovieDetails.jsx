import { NavLink, useParams } from "react-router-dom";
import css from "./MovieDetails.module.css";
import PropTypes from "prop-types";

export default function MovieDetails({
  movie: { poster_path, title, release_date, genres, vote_average, overview },
}) {
  const { movieId } = useParams();

  const navLinks = [
    { to: "cast", label: "Cast" },
    { to: "reviews", label: "Reviews" },
  ];

  return (
    <>
      <div className={css["details-main"]}>
        <div className={css["img-wrap"]}>
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
          />
        </div>
        <div>
          <div>
            <h1 className={css.title}>
              {title} ({release_date.slice(0, 4)})
            </h1>
            <p>User score: {vote_average}</p>
          </div>
          <div>
            <h2>Overview</h2>
            <p>{overview}</p>
          </div>

          <div>
            <h2>Genres</h2>
            <p className={css.genres}>
              {genres.map((genre) => (
                <span key={genre.id}>{genre.name}</span>
              ))}
            </p>
          </div>
        </div>
      </div>
      <nav className={css.navigation}>
        <h3>Additional information</h3>
        <ul className={css["link-list"]}>
          {navLinks.map(({ to, label }) => (
            <li key={label}>
              <NavLink
                to={to}
                state={movieId}
                className={({ isActive }) =>
                  isActive
                    ? `${css["list-item"]} ${css.active}`
                    : css["list-item"]
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

MovieDetails.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.string),
    vote_average: PropTypes.number,
    overview: PropTypes.string,
  }).isRequired,
};
