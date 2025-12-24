import css from "./Button.module.css";

export default function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className={css["show-more-btn"]}>
      {children}
    </button>
  );
}
