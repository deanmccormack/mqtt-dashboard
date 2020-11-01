import PropTypes from 'prop-types';

import {
  getGaugeChartData,
  getMessageStreamChartData,
  getNetworkStreamChartData,
  getConnectionChartData,
  getTotalConnectionChartData,
} from '../model/chart-data';

import StreamWindowChartControl from '../components/StreamWindowChartControl';

import NetworkStreamChart from './NetworkStreamChart';
import Gauge from './Gauge';
import MessageStreamChart from './MessageStreamChart';
import ConnectionChart from './ConnectionChart';
import TotalConnectionChart from './TotalConnectionChart';

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
            <MessageStreamChart chartProps={getMessageStreamChartData(historyMetrics, 300, 2 * 1000)} />
          </div>
          <div id="gauge-chart" className="chart">
            <Gauge chartProps={getGaugeChartData(historyMetrics)} />
          </div>
          <div className="chart">
            <ConnectionChart chartProps={getConnectionChartData(historyMetrics)} />
          </div>
          <div className="chart">
            <NetworkStreamChart chartProps={getNetworkStreamChartData(historyMetrics)} />
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
