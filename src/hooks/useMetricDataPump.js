import React, { useState, useEffect } from 'react';

import DataPumpContext from '../context/DataPumpContext';

export default function useMetricDataPump({ screenRefresh }) {
  const dataPump = React.useContext(DataPumpContext);

  const [metricsStream, setMetricsStream] = useState(dataPump.getMetricsStream());

  useEffect(() => {
    const id = setInterval(() =>  {
      setMetricsStream(dataPump.getMetricsStream())
    }, screenRefresh);
    return () => clearInterval(id);
  }, [dataPump, screenRefresh]);

  return [metricsStream[metricsStream.length -1], metricsStream];
  /*
  useEffect(() => {
    const id = setInterval(async() =>  {
      const requests = MetricUrls.map(metricUrl => fetch(metricUrl));
      const responses = await Promise.all(requests);
      const newMetricData = await Promise.all(responses.reduce((a, response) => [...a, response.json()], []));
      const newMetrics = newMetricData.reduce((acc, data, i) => ({
        ...acc,
        [Object.keys(Metrics)[i]]: data,
      }), {});
      setMetrics(newMetrics);
      setHistoryMetrics([...historyMetrics, newMetrics])
    }, metricRefresh);
    return () => clearInterval(id);
  }, [historyMetrics, metricRefresh]);
  */

};
