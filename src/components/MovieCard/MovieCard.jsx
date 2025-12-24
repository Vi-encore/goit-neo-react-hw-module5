import css from './MovieCard.module.css'

export default function MovieCard({ title, image }) {
  return (
    <div className={css.card}>
      <img src={`https://image.tmdb.org/t/p/w500${image}`} alt={title} className={css['card-img']}/>
      <h2 className={css['card-title']}>{title}</h2>
    </div>
  );
}
