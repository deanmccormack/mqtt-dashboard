import { AutoSizer } from 'react-virtualized';

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  AreaSeries
} from 'react-vis';

export default function ChartOne(props) {
  return (
  <AutoSizer>
    {({ height, width }) => (

    <XYPlot width={width} height={height}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis />
      <YAxis />
      <AreaSeries
        className="area-series-example"
        curve="curveNatural"
        data={[{x: 1, y: 10}, {x: 2, y: 5}, {x: 3, y: 15}]}
      />
    </XYPlot>)}
  </AutoSizer>
  );
}
