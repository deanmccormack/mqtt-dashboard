import {
  FlexibleXYPlot,
  XAxis,
  YAxis,
  LineSeries,
} from 'react-vis';

import {
  MSG_INCOMING_TOTAL_COUNT,
  MSG_OUTGOING_TOTAL_COUNT,
} from '../types/metric-types';

export default function MessageStreamChart({
  data,
}) {
  return (
    <FlexibleXYPlot
      dontCheckIfEmpty
      xType={'time'}
      xDomain={data.xDomain}
      yDomain={data.yDomain}
    >
      <XAxis
        title="Stream Window"
        attr="x"
        orientation="bottom"
        tickFormat={(d) => new Date(d).toLocaleTimeString()}
        tickLabelAngle={120}
      />
      <YAxis title="Message Count" />
      <LineSeries
        data={data.data[MSG_INCOMING_TOTAL_COUNT]}
        getNull={(d) => d.y !== null}
        style={{strokeWidth: 2}}
      />
      <LineSeries
        style={{strokeWidth: 2}}
        data={data.data[MSG_OUTGOING_TOTAL_COUNT]}
      />
    </FlexibleXYPlot>
  );
}
