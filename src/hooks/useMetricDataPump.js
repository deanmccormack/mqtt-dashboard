import { useState, useEffect } from 'react';

import { DefaultMetrics, nextMetricsSlice } from '../model/metrics';

const HistoryMetrics = [];

export default function useMetricDataPump({ metricRefresh }) {
  const [metrics, setMetrics] = useState(DefaultMetrics);
  const [historyMetrics, setHistoryMetrics] = useState(HistoryMetrics);

  useEffect(() => {
    const id = setInterval(() =>  {
      const newMetrics = nextMetricsSlice(metrics);
      setMetrics(newMetrics);
      setHistoryMetrics([
        ...(historyMetrics.length > 1200
          ? historyMetrics.slice(200)
          : historyMetrics
        ),
        newMetrics
      ])
    }, metricRefresh);
    return () => clearInterval(id);
  }, [historyMetrics, metricRefresh, metrics]);

  return [ metrics, historyMetrics ];
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
