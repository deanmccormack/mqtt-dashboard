import PropTypes from 'prop-types';

export default function StreamWindowChartControl({
  delta,
  slide,
  window,
}) {
  return (
    <div className="window-chart-control">
      <div>{`window: ${window}`}</div>
      <div>{`slide: ${slide}`}</div>
      <div>{`delta: ${delta}`}</div>
    </div>
  );
};
StreamWindowChartControl.propTypes = {
  delta: PropTypes.number,
  slide: PropTypes.number,
  window: PropTypes.number,
};
