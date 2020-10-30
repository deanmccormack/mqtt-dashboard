import {
  FlexibleXYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  AreaSeries,
  LineMarkSeries,
} from 'react-vis';

import {
  MSG_INCOMING_TOTAL_COUNT,
  MSG_OUTGOING_TOTAL_COUNT,
  MSG_QUEUED_COUNT,
  MSG_RETAINED_CURRENT_COUNT,
} from '../types/metric-types';

export default function ChartTwo({
  data,
}) {
  return (
      <FlexibleXYPlot>
       <VerticalGridLines />
       <HorizontalGridLines />
       <XAxis />
       <YAxis />
       <AreaSeries
         className="area-elevated-series-1"
         color="#79c7e3"
         data={data[MSG_INCOMING_TOTAL_COUNT]}
       />
       <AreaSeries LineMarkSeries
         className="area-elevated-series-2"
         color="#12939a"
         data={data[MSG_OUTGOING_TOTAL_COUNT]}
       />
       <AreaSeries LineMarkSeries
         className="area-elevated-series-2"
         color="#19129b"
         data={data[MSG_RETAINED_CURRENT_COUNT]}
       />
       <AreaSeries LineMarkSeries
         className="area-elevated-series-2"
         color="#9b126e"
         data={data[MSG_QUEUED_COUNT]}
       />
     </FlexibleXYPlot>
  );
}
