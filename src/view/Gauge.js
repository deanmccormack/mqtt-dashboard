import {
  FlexibleXYPlot,
  HorizontalBarSeries,
} from 'react-vis';

 export default function Gauge({
   data,
 }) {
  return (
    <FlexibleXYPlot>
      <HorizontalBarSeries
        color="red"
        data={data}
      />
    </FlexibleXYPlot>
  );
}
