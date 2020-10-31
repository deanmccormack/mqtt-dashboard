import PropTypes from 'prop-types';

import {
  getGaugeChartData,
  getMessageStreamChartData,
  getNetworkStreamChartData,
  getConnectionChartData,
} from '../model/metrics';

import StreamWindowChartControl from '../components/StreamWindowChartControl';

import NetworkStreamChart from './NetworkStreamChart';
import Gauge from './Gauge';
import MessageStreamChart from './MessageStreamChart';
import ConnectionChart from './ConnectionChart';

export default function ChartView({
  historyMetrics,
  handleScreenPauseClick,
  isScreenPaused,
}) {

  return (
    <div className="chart-view">
    {historyMetrics.length === 0
      ? 'Loading...'
      : <>
          <div id="chart-controls">
            <StreamWindowChartControl window={300} slide={0} delta={2} />
            <button onClick={handleScreenPauseClick}>
              {isScreenPaused? 'Resume' : 'Pause' }
            </button>
          </div>
          <div id="main-chart" className="chart">
            <MessageStreamChart data={getMessageStreamChartData(historyMetrics, 300, 2000)} />
          </div>
          <div id="gauge-chart" className="chart">
            <Gauge data={getGaugeChartData(historyMetrics)} />
          </div>
          <div className="chart">
            <ConnectionChart data={getConnectionChartData(historyMetrics)} />
          </div>
          <div className="chart">
            <NetworkStreamChart data={getNetworkStreamChartData(historyMetrics)} />
          </div>
        </>
    }
    </div>
  );
};
ChartView.propTypes = {
  // FIXME: shapeOf
  historyMetrics: PropTypes.array,
  handleScreenPauseClick: PropTypes.func,
  isScreenPaused: PropTypes.bool,
};
