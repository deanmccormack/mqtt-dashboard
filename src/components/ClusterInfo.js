import PropTypes from 'prop-types';

export default function ClusterInfo({
  label,
  value,
}) {
  return (
    <div className="cluster-info">
      <span>{`(${label}: ${value})`}</span>
      <span className="status-bulb"></span>
    </div>
  );
};
ClusterInfo.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number,
};
