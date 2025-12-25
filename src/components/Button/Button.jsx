import PropTypes from "prop-types";
import css from "./Button.module.css";

export default function Button({ onClick, text }) {
  return (
    <button onClick={onClick} className={css["show-more-btn"]}>
      {text}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
