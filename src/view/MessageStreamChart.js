import {
  FlexibleXYPlot,
  XAxis,
  YAxis,
  LineSeries,
} from 'react-vis';

import {
  MSG_INCOMING_TOTAL_COUNT,
  MSG_OUTGOING_TOTAL_COUNT,
  MSG_RETAINED_CURRENT_COUNT,
} from '../types/metric-types';

export default function MessageStreamChart({
  chartProps
}) {
  const { data, xDomain, yDomain } = chartProps;
  return (
    <FlexibleXYPlot
      dontCheckIfEmpty
      xType={'time'}
      xDomain={xDomain}
      yDomain={yDomain}
    >
      <XAxis
        title="Stream Window"
        attr="x"
        orientation="bottom"
        tickFormat={(d) => new Date(d).toLocaleTimeString()}
        tickLabelAngle={270}
      />
      <YAxis title="Message Count" />
      <LineSeries
        data={data[MSG_INCOMING_TOTAL_COUNT]}
        getNull={(d) => d.y !== null}
        style={{strokeWidth: 2}}
      />
      <LineSeries
        style={{strokeWidth: 2}}
        data={data[MSG_OUTGOING_TOTAL_COUNT]}
      />
      <LineSeries
        style={{strokeWidth: 2}}
        data={data[MSG_RETAINED_CURRENT_COUNT]}
      />
    </FlexibleXYPlot>
  );
}
