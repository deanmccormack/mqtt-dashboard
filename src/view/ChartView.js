import PropTypes from 'prop-types';

import {
  getGaugeChartData,
  getMessageStreamChartData,
  getNetworkStreamChartData,
  getConnectionChartData,
//  getTotalConnectionChartData,
} from '../model/chart-data';

import StreamWindowChartControl from '../components/StreamWindowChartControl';

import NetworkStreamChart from './NetworkStreamChart';
import Gauge from './Gauge';
import MessageStreamChart from './MessageStreamChart';
import ConnectionChart from './ConnectionChart';
//import TotalConnectionChart from './TotalConnectionChart';

export default function ChartView({
  metricsStream,
  handleScreenPauseClick,
  isScreenPaused,
}) {

  return (
    <div className="chart-view">
    {metricsStream.length === 0
      ? 'Loading...'
      : <>
          <div id="chart-controls">
            <StreamWindowChartControl window={300} slide={0} delta={2} />
            <button onClick={handleScreenPauseClick}>
              {isScreenPaused? 'Resume' : 'Pause' }
            </button>
          </div>
          <div id="main-chart" className="chart">
            <MessageStreamChart chartProps={getMessageStreamChartData(metricsStream, 300, 2 * 1000)} />
          </div>
          <div id="gauge-chart" className="chart">
            <Gauge chartProps={getGaugeChartData(metricsStream)} />
          </div>
          <div className="chart">
            <ConnectionChart chartProps={getConnectionChartData(metricsStream)} />
          </div>
          <div className="chart">
            <NetworkStreamChart chartProps={getNetworkStreamChartData(metricsStream)} />
          </div>
        </>
    }
    </div>
  );
};
ChartView.propTypes = {
  // FIXME: shapeOf
  metricsStream: PropTypes.array,
  handleScreenPauseClick: PropTypes.func,
  isScreenPaused: PropTypes.bool,
};
