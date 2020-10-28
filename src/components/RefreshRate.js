import PropTypes from 'prop-types';

export default function RefreshRate({
  value,
}) {
  return (
    <div className="refresh-rate">
      <div>{`Refresh Rate: ${value}`}</div>
    </div>
  );
};
RefreshRate.propTypes = {
  value: PropTypes.string,
};
