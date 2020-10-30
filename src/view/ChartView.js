
import PropTypes from 'prop-types';

import { getMessageStreamChartData } from '../model/metrics';

import ChartOne from '../components/ChartOne';
import ChartTwo from '../components/ChartTwo';

export default function ChartView({
  historyMetrics
}) {
  return (
    <div className="chart-view">
    {historyMetrics.length === 0
        ? 'Loading...'
        : <>
          <div id="main-chart" className="chart">
            <ChartTwo data={getMessageStreamChartData(historyMetrics)} />
          </div>
          <div className="chart"><ChartOne /></div>
          <div className="chart"><ChartOne /></div>
          </>
    }
    </div>
  );
};
ChartView.propTypes = {
  // FIXME: shapeOf
  historyMetrics: PropTypes.array,
};
