import PropTypes from "prop-types";

export default function Message({ message }) {
  return (
    <p className={"message"}>
      <span role="img">👋</span> {message}
    </p>
  );
}

Message.propTypes = {
  message: PropTypes.string,
};
