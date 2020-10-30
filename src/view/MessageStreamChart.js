import {
  FlexibleXYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
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
    <FlexibleXYPlot>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis title="Stream Window"/>
      <YAxis title="Message Count"/>
      <LineSeries
        data={data[MSG_INCOMING_TOTAL_COUNT]}
        style={{stroke: '#e708d1', strokeWidth: 3}}
      />
      <LineSeries
        style={{stroke: '#12939a', strokeWidth: 3}}
        data={data[MSG_OUTGOING_TOTAL_COUNT]}
      />
    </FlexibleXYPlot>
  );
}
