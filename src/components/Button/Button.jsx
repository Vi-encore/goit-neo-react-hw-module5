import PropTypes from "prop-types";
import css from "./Button.module.css";
import { Link } from "react-router-dom";

export default function Button({ onClick, text, to }) {
  if (to) {
    return (
      <Link to={to} className={css["show-more-btn"]}>
        {text}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={css["show-more-btn"]}>
      {text}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func, 
  text: PropTypes.string.isRequired,
  to: PropTypes.string, 
};