import {
  FlexibleXYPlot,
  HorizontalBarSeries,
  VerticalGridLines
} from 'react-vis';

 export default function Gauge({
   data,
 }) {
  return (
    <FlexibleXYPlot stackBy="x" xDomain={data.xDomain}>
      <VerticalGridLines />
      <HorizontalBarSeries data={data.data} />
    </FlexibleXYPlot>
  );
}
