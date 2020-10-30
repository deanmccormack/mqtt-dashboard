//import { AutoSizer } from 'react-virtualized';

import {
  FlexibleXYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  AreaSeries,
} from 'react-vis';

 export default function ChartOne(props) {
  return (
    <FlexibleXYPlot>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis />
      <YAxis />
      <AreaSeries
        className="area-series-example"
        curve="curveNatural"
        data={[{x: 1, y: 10}, {x: 2, y: 5}, {x: 3, y: 15}]}
      />
    </FlexibleXYPlot>
  );
}
