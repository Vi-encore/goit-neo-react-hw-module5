export default function MovieList({ movies }) {
  console.log(movies);
  return (
    <>
      List
      {movies.map((movie) => (
        <p key={movie.title}>{movie.title}</p>
      ))}
    </>
  );
}
