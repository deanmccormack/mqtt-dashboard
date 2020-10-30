import {
  FlexibleXYPlot,
  XAxis,
  YAxis,
  LineSeries,
  HorizontalGridLines,
} from 'react-vis';

 export default function Gauge({
   data,
 }) {
  return (
    <FlexibleXYPlot>
      <HorizontalGridLines />
      <LineSeries
        color="red"
        data={data}/>
    <XAxis title="X" />
    <YAxis />
    </FlexibleXYPlot>
  );
}
