import PropTypes from "prop-types";

export default function ErrorMessage({ error }) {
  return (
    <div>
      <h2>Sorry, something went wrong!</h2>
      <p>{error}</p>
    </div>
  );
}

ErrorMessage.propTypes = {
  error: PropTypes.string.isRequired,
};
