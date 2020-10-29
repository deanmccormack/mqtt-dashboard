import { useState, useEffect } from 'react';

import './App.css';

import {
  NETWORKING_BYTES_WRITE_TOTAL,
  MSG_INCOMING_TOTAL_COUNT,
  MSG_OUTGOING_TOTAL_COUNT,
  MSG_QUEUED_COUNT,
  MSG_RETAINED_CURRENT_COUNT,
  NETWORKING_BYTES_READ_TOTAL,
  NETWORKING_CONNECTIONS_CURRENT,
  SESSSIONS_OVERALL_COUNT,
  SUB_OVERALL_CURRENT_COUNT,
} from './metric-types';

import BrokerInfo from './components/BrokerInfo';
import ChartOne from './components/ChartOne';
import ChartTwo from './components/ChartTwo';
import ConnectionSettings from './components/ConnectionSettings';
import GettingStartInfo from './components/GettingStartInfo';
import MetricsContainer from './components/MetricsContainer';
import RefreshRate from './components/RefreshRate';

const PORT = '8000';

const HOST = 'broker.hivemq.com';

const CLUSTER_SIZE = 'meta/clustersize';

const METRIC_PREFIX = 'com.hivemq';

const DB_API_URL = 'http://mqtt-dashboard-lb-1160139393.eu-central-1.elb.amazonaws.com:8080/api';

const clustersizeUrl = `${DB_API_URL}/${CLUSTER_SIZE}`;

const getMetricUrl = (metricName, metricValue) => `${DB_API_URL}/metric/${METRIC_PREFIX}.${metricName}/${metricValue}`

const COUNT_VALUE = 'count';

const incomingMsgCntUrl = getMetricUrl(MSG_INCOMING_TOTAL_COUNT, COUNT_VALUE);
const outGoingMsgCntUrl = getMetricUrl(MSG_OUTGOING_TOTAL_COUNT, COUNT_VALUE);
const queuedMsgCntUrl = getMetricUrl(MSG_QUEUED_COUNT, COUNT_VALUE);
const retainedMsgCntUrl = getMetricUrl(MSG_RETAINED_CURRENT_COUNT, COUNT_VALUE);

const networkingBytesReadTotalUrl = getMetricUrl(NETWORKING_BYTES_READ_TOTAL, COUNT_VALUE);
const networkingBytesWriteTotalUrl = getMetricUrl(NETWORKING_BYTES_WRITE_TOTAL, COUNT_VALUE);
const networkingConnectionsCurrentUrl = getMetricUrl(NETWORKING_CONNECTIONS_CURRENT, COUNT_VALUE);

const sessionsOverallUrl = getMetricUrl(SESSSIONS_OVERALL_COUNT, COUNT_VALUE);
const currentSubscriptionCntUrl = getMetricUrl(SUB_OVERALL_CURRENT_COUNT, COUNT_VALUE);

// order! Metrics=MetricsUrls
const MetricUrls = [
  clustersizeUrl,
  incomingMsgCntUrl,
  outGoingMsgCntUrl,
  queuedMsgCntUrl,
  retainedMsgCntUrl,
  networkingBytesReadTotalUrl,
  networkingBytesWriteTotalUrl,
  networkingConnectionsCurrentUrl,
  sessionsOverallUrl,
  currentSubscriptionCntUrl,
];

// order! Metrics=MetricsUrls
const Metrics = {
  [CLUSTER_SIZE]: 4,
  [MSG_INCOMING_TOTAL_COUNT]: 21000,
  [MSG_OUTGOING_TOTAL_COUNT]: 17000,
  [MSG_QUEUED_COUNT]: 5900,
  [MSG_RETAINED_CURRENT_COUNT]: 1456,
  [NETWORKING_BYTES_READ_TOTAL]: 219889887,
  [NETWORKING_BYTES_WRITE_TOTAL]: 219889887,
  [NETWORKING_CONNECTIONS_CURRENT]: 5678,
  [SESSSIONS_OVERALL_COUNT]: 12566,
  [SUB_OVERALL_CURRENT_COUNT]: 17566,
};

const HistoryMetrics = [];

const MetricLabels = {
  [CLUSTER_SIZE]: 'Cluster Size',
  [MSG_INCOMING_TOTAL_COUNT]: 'Incoming Messsages',
  [MSG_OUTGOING_TOTAL_COUNT]: 'Outgoing Messsages',
  [MSG_QUEUED_COUNT]: 'Queued Messsages',
  [MSG_RETAINED_CURRENT_COUNT]: 'Retained Messsages',
  [NETWORKING_BYTES_READ_TOTAL]: 'Networking Bytes Read',
  [NETWORKING_BYTES_WRITE_TOTAL]: 'Networking Bytes Write',
  [NETWORKING_CONNECTIONS_CURRENT]: 'Current Connections',
  [SESSSIONS_OVERALL_COUNT]: 'Total Connections',
  [SUB_OVERALL_CURRENT_COUNT]: 'Current Subscriptions',
};

const NetworkMetricsKeys = [
  NETWORKING_BYTES_READ_TOTAL,
  NETWORKING_BYTES_WRITE_TOTAL,
  NETWORKING_CONNECTIONS_CURRENT,
];

const MessageMetricsKeys = [
  MSG_INCOMING_TOTAL_COUNT,
  MSG_OUTGOING_TOTAL_COUNT,
  MSG_QUEUED_COUNT,
  MSG_RETAINED_CURRENT_COUNT,
];

const ConnectionMetricsKeys = [
  SESSSIONS_OVERALL_COUNT,
];

const SubscriptionMetricsKeys = [
  SUB_OVERALL_CURRENT_COUNT,
];

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);
const MetricCountGenerator = {
  [CLUSTER_SIZE]: () => 4,
  [MSG_INCOMING_TOTAL_COUNT]: () => randomNumber(25000, 29000),
  [MSG_OUTGOING_TOTAL_COUNT]: () => randomNumber(15000, 24000),
  [MSG_QUEUED_COUNT]: () => randomNumber(4000, 7000),
  [MSG_RETAINED_CURRENT_COUNT]: () => randomNumber(1500, 2700),
  [NETWORKING_BYTES_READ_TOTAL]: () => 17000 + randomNumber(1500, 2700),
  [NETWORKING_BYTES_WRITE_TOTAL]: () => 14000 + randomNumber(1500, 2700),
  [NETWORKING_CONNECTIONS_CURRENT]: () => randomNumber(15000, 2700),
  [SESSSIONS_OVERALL_COUNT]: () => randomNumber(5000, 7000),
  [SUB_OVERALL_CURRENT_COUNT]: () => randomNumber(8000, 17000),
};

const creatSliceData = (x, y) => ({x, y});

const getMessageStreamChartData = (historyMetrics) =>
  historyMetrics.reduce((acc, slice, i) => ({
   [MSG_INCOMING_TOTAL_COUNT]: [...acc[MSG_INCOMING_TOTAL_COUNT], creatSliceData(i, slice[MSG_INCOMING_TOTAL_COUNT])],
   [MSG_OUTGOING_TOTAL_COUNT]: [...acc[MSG_OUTGOING_TOTAL_COUNT], creatSliceData(i, slice[MSG_OUTGOING_TOTAL_COUNT])],
   [MSG_QUEUED_COUNT]: [...acc[MSG_QUEUED_COUNT], creatSliceData(i, slice[MSG_QUEUED_COUNT])],
   [MSG_RETAINED_CURRENT_COUNT]: [...acc[MSG_RETAINED_CURRENT_COUNT], creatSliceData(i, slice[MSG_RETAINED_CURRENT_COUNT])]
}), {
  [MSG_INCOMING_TOTAL_COUNT]: [],
  [MSG_OUTGOING_TOTAL_COUNT]: [],
  [MSG_QUEUED_COUNT]: [],
  [MSG_RETAINED_CURRENT_COUNT]: []
});

const METRIC_REFRESH = 1000;

function App() {

  const [metricRefresh, setMetricRefresh] = useState(METRIC_REFRESH);
  const [metrics, setMetrics] = useState(Metrics);
  const [historyMetrics, setHistoryMetrics] = useState(HistoryMetrics);

  useEffect(() => {
    const id = setInterval(async() =>  {
      const newMetrics = Object.keys(MetricCountGenerator).reduce((acc, metric, ) => ({
        ...acc,
        [metric]: MetricCountGenerator[metric](),
      }), {});
      setMetrics(newMetrics);
      setHistoryMetrics([...historyMetrics, newMetrics])
    }, metricRefresh);
    return () => clearInterval(id);
  }, [historyMetrics, metricRefresh]);


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

  return (
    <div className="grid-container">
      <header className="header">
        <div>LOGO</div>
        <h1>MQTT Dashboard</h1>
        <div>Starter launch</div>
        <div className="cluster-info">
          <span>{`(${MetricLabels[CLUSTER_SIZE]}: ${metrics[CLUSTER_SIZE]})`}</span>
          <span className="status-bulb"></span>
        </div>
      </header>
      <aside className="side-metrics">
        <section>
          <MetricsContainer keys={ConnectionMetricsKeys} metrics={metrics} labels={MetricLabels} />
        </section>
        <section>
          <MetricsContainer keys={SubscriptionMetricsKeys} metrics={metrics} labels={MetricLabels} />
        </section>
        <section>
          <MetricsContainer keys={MessageMetricsKeys} metrics={metrics} labels={MetricLabels} />
        </section>
        <section>
          <MetricsContainer keys={NetworkMetricsKeys} metrics={metrics} labels={MetricLabels} />
        </section>
      </aside>
      <main className="main">
        <div
          id="main-chart"
          className="chart"
        > {historyMetrics.length > 0
          && <ChartTwo data={getMessageStreamChartData(historyMetrics)} />
          }
        </div>
        <div className="chart"><ChartOne /></div>
        <div className="chart"><ChartOne /></div>
        <div className="chart"><ChartOne /></div>
      </main>
      <aside className="info-container">
        <BrokerInfo />
        <GettingStartInfo />
      </aside>
      <section className="settings">
        <RefreshRate value={metricRefresh} />
        <ConnectionSettings host={HOST} port={PORT} />
      </section>
      <footer className="footer">blah blah</footer>
    </div>

  );
}

export default App;
