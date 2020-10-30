import {
  FlexibleXYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  AreaSeries,
} from 'react-vis';

 export default function NetworkStreamChart({
   data
 }) {
  return (
    <FlexibleXYPlot>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis />
      <YAxis />
      <AreaSeries
        className="area-series-example"
        curve="curveNatural"
        data={data}
      />
    </FlexibleXYPlot>
  );
}