import PropTypes from 'prop-types';

export default function Metric({
  formatter,
  label,
  value,
}) {
  const display = formatter
    ? formatter(value)
    : value;

  return (
    <div className="side-metric content">
      <span>{label}</span>
      <span className="side-metric-value">{display}</span>
    </div>
  );
};
Metric.propTypes = {
  formatter: PropTypes.func,
  label: PropTypes.string,
  value: PropTypes.number,
}
