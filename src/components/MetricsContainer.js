import PropTypes from 'prop-types';

import {
  NETWORKING_BYTES_READ_TOTAL,
  NETWORKING_BYTES_WRITE_TOTAL,
} from '../types/metric-types';

import Metric from './Metric';

const bytesToSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return 'n/a'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
  if (i === 0) return `${bytes} ${sizes[i]}`
  return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
};

const getMetricFormatter = (metric) => {
  switch (metric) {
    case NETWORKING_BYTES_READ_TOTAL:
    case NETWORKING_BYTES_WRITE_TOTAL:
      return bytesToSize;
    default:
      return;
  }
}


export default function MetricsContainer({
  keys,
  metrics,
  labels
}) {
  return keys.map((metric, i) => (
    <Metric
      key={i}
      formatter={getMetricFormatter(metric)}
      value={metrics[metric]}
      label={labels[metric]}
    />
  ));
}
MetricsContainer.propTypes = {
  keys: PropTypes.array,
  metrics: PropTypes.object,
  labels: PropTypes.object
}
