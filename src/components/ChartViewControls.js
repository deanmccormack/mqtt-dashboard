import PropTypes from 'prop-types';

import { ALL_CHART_VIEW, MSG_CHART_VIEW }  from '../types/chart-view-types';

import StreamWindowChartControl from './StreamWindowChartControl';

export default function ChartViewControls({
  handleChartViewUpdate,
  handleStreamWindowUpate,
  handleScreenPauseClick,
  isScreenPaused,
  chartView,
  streamWindowProps
}) {
  const onChartViewChange = (event) => {
    event.preventDefault();
    handleChartViewUpdate(event.target.value);
  };

  return (
    <div id="chart-controls">
      {
      //<div className="refresh-rate">
      //  <label htmlFor="chartView">{'View'}</label>
      //  <select id="chartView" name="chartView" defaultValue={chartView} onChange={onChartViewChange}>
      //    <option value={MSG_CHART_VIEW}>{'View Message Stream Charts'}</option>
      //    <option value={ALL_CHART_VIEW}>{'View All Charts'}</option>
      //  </select>
      //</div>
      }
      <StreamWindowChartControl
        streamWindowProps={streamWindowProps}
        handleStreamWindowUpate={handleStreamWindowUpate}
      />
      <button style={{width: '6vw'}} onClick={handleScreenPauseClick}>
        {isScreenPaused? 'Resume' : 'Pause' }
      </button>
    </div>
  )
};
ChartViewControls.propTypes = {
  chartView: PropTypes.string,
  handleChartViewUpdate: PropTypes.func,
  handleStreamWindowUpate: PropTypes.func,
  handleScreenPauseClick: PropTypes.func,
  isScreenPaused: PropTypes.bool,
  streamWindowProps: PropTypes.object,
};
