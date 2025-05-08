import PropTypes from 'prop-types';

export const FallbackComponent = ({ error }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre className="text-warning-500">{error.message}</pre>
    </div>
  );
};
FallbackComponent.propTypes = {
  error: PropTypes.object.isRequired,
};
