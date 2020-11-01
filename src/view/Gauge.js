import {
  FlexibleXYPlot,
  HorizontalBarSeries,
  VerticalGridLines
} from 'react-vis';

 export default function Gauge({
   chartProps,
 }) {
  const { color, data, xDomain } = chartProps;
  return (
    <FlexibleXYPlot  margin={{bottom: 0, top: 0}} stackBy="x" xDomain={xDomain}>
      <VerticalGridLines />
      <HorizontalBarSeries opacity={.7} color={color} data={data} />
    </FlexibleXYPlot>
  );
}
