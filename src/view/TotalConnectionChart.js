import {
  RadialChart,
  makeVisFlexible,
} from 'react-vis';

 export default makeVisFlexible(function TotalConnectionChart({
   chartProps
 }) {

  const { data } = chartProps;

  return (
    <RadialChart
      data={data}
      colorType="literal"
    />
  );
});
