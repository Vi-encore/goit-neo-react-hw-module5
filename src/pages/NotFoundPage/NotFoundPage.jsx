import { Link } from "react-router-dom";
import css from './NotFoundPage.module.css'

export default function NotFoundPage() {
  return (
    <div className={css.wrap}>
      <h1>Oops! Page does not exist!</h1>
      <Link to={"/"} className={css['return-link']}>Return to Homepage</Link>
    </div>
  );
}
