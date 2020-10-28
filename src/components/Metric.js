import PropTypes from 'prop-types';

export default function Metric({
  label,
  value
}) {
  return (
    <div className="side-metric content">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
};
Metric.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
}
