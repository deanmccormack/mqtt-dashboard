import {
  FlexibleXYPlot,
  XAxis,
  YAxis,
  VerticalBarSeries,
} from 'react-vis';

 export default function NetworkStreamChart({
   chartProps
 }) {

  const { data, yDomain } = chartProps;

  return (
    <FlexibleXYPlot xType="ordinal">
      <XAxis />
      <YAxis yDomain={yDomain} />
      <VerticalBarSeries data={data} />
    </FlexibleXYPlot>
  );
}
