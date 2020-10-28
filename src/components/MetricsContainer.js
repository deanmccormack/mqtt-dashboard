import PropTypes from 'prop-types';

import Metric from './Metric';

export default function MetricsContainer({
  keys,
  metrics,
  labels
}) {
  return keys.map(metric => (<Metric value={metrics[metric]} label={labels[metric]} />))
}
MetricsContainer.propTypes = {
  keys: PropTypes.array,
  metrics: PropTypes.object,
  labels: PropTypes.object
}
