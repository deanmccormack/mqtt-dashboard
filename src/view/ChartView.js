import { useState } from 'react';

import PropTypes from 'prop-types';

import {
  getGaugeChartData,
  getMessageStreamChartData,
  getNetworkStreamChartData,
  getConnectionChartData,
//  getTotalConnectionChartData,
} from '../model/chart-data';

import { WINDOW_SIZE, SLIDE } from '../types/stream-window-types';
import { ALL_CHART_VIEW, MSG_CHART_VIEW }  from '../types/chart-view-types';

import ChartViewControls from '../components/ChartViewControls';

import NetworkStreamChart from './NetworkStreamChart';
import Gauge from './Gauge';
import MessageStreamChart from './MessageStreamChart';
import ConnectionChart from './ConnectionChart';
//import TotalConnectionChart from './TotalConnectionChart';

const DefaultStreamWindowProps = {
  [WINDOW_SIZE]: 180,
  [SLIDE]: 0,
};

export default function ChartView({
  metricsStream,
  handleScreenPauseClick,
  isScreenPaused,
}) {

  const [streamWindowProps, setStreamWindowProps] = useState(DefaultStreamWindowProps);
  const [chartView, setChartView] = useState(MSG_CHART_VIEW);

  const handleStreamWindowUpate = ({ name, value }) => setStreamWindowProps({
    ...streamWindowProps,
    [name]: value,
  });

  const handleChartViewUpdate = (view) => setChartView(view);

  const getIsDisplayAllCharts = () => chartView === ALL_CHART_VIEW;

  return (
    <div className={`chart-view ${chartView}`}>
    {metricsStream.length === 0
      ? 'Loading...'
      : <>
          <ChartViewControls
            chartView={chartView}
            handleChartViewUpdate={handleChartViewUpdate}
            handleStreamWindowUpate={handleStreamWindowUpate}
            handleScreenPauseClick={handleScreenPauseClick}
            isScreenPaused={isScreenPaused}
            streamWindowProps={streamWindowProps}
          />
          <div id="main-chart" className="chart">
            <MessageStreamChart
              chartProps={getMessageStreamChartData(
                metricsStream,
                streamWindowProps[WINDOW_SIZE],
                streamWindowProps[SLIDE]
              )}
            />
          </div>
          <div id="gauge-chart" className="chart">
            <Gauge chartProps={getGaugeChartData(metricsStream)} />
          </div>
          {getIsDisplayAllCharts() &&
           <>
            <div className="chart">
              <ConnectionChart chartProps={getConnectionChartData(metricsStream)} />
            </div>
            <div className="chart">
              <NetworkStreamChart chartProps={getNetworkStreamChartData(metricsStream)} />
            </div>
          </>
        }
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
