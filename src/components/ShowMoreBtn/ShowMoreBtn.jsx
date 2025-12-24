import css from './ShowMoreBtn.module.css'

export default function ShowMoreBtn({ onShowMore }) {
  return <button onClick={onShowMore} className={css['show-more-btn']}>Show more</button>;
}
