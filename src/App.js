import { useState, useEffect } from 'react';

import './App.css';

import BrokerInfo from './components/BrokerInfo';
import ConnectionSettings from './components/ConnectionSettings';
import GettingStartInfo from './components/GettingStartInfo';
import MetricsContainer from './components/MetricsContainer';
import RefreshRate from './components/RefreshRate';

const PORT = '8000';

const HOST = 'broker.hivemq.com';

const CLUSTER_SIZE = 'meta/clustersize';

const METRIC_PREFIX = 'com.hivemq';

const DB_API_URL = 'https://mqtt-dashboard-lb-1160139393.eu-central-1.elb.amazonaws.com:8080/api';
// metric
const MSG_INCOMING_TOTAL_COUNT = `messages.incoming.total.count`;
const MSG_OUTGOING_TOTAL_COUNT = `messages.outgoing.total.count`;
const MSG_QUEUED_COUNT = `messages.queued.count`;
const MSG_RETAINED_CURRENT_COUNT = `messages.retained.current`;

const NETWORKING_BYTES_READ_TOTAL = `networking.bytes.read.total`;
const NETWORKING_BYTES_WRITE_TOTAL = `networking.bytes.write.total`;
const NETWORKING_CONNECTIONS_CURRENT = `networking.connections.current`;

const SESSSIONS_OVERALL_COUNT = `sessions.overall.current`
const SUB_OVERALL_CURRENT_COUNT = `subscriptions.overall.current`;

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
  [CLUSTER_SIZE]: 0,
  [MSG_INCOMING_TOTAL_COUNT]: 0,
  [MSG_OUTGOING_TOTAL_COUNT]: 0,
  [MSG_QUEUED_COUNT]: 0,
  [MSG_RETAINED_CURRENT_COUNT]: 0,
  [NETWORKING_BYTES_READ_TOTAL]: 0,
  [NETWORKING_BYTES_WRITE_TOTAL]: 0,
  [NETWORKING_CONNECTIONS_CURRENT]: 0,
  [SESSSIONS_OVERALL_COUNT]: 0,
  [SUB_OVERALL_CURRENT_COUNT]: 0,
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

const METRIC_REFRESH = 5000;

function App() {
  const [metricRefresh, setMetricRefresh] = useState(METRIC_REFRESH);
  const [metrics, setMetrics] = useState(Metrics);
  // FIXME: will grow!
  const [historyMetrics, setHistoryMetrics] = useState(HistoryMetrics);

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

  return (
    <div class="grid-container">
      <header class="header">MQTT Dashboard</header>
      <aside class="side-metrics">
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
      <main class="main">
        <p>Charts Go Here</p>
        <p>
          Praesent dignissim sapien id odio rutrum interdum. Phasellus feugiat blandit libero vel ultrices. Curabitur elementum placerat lectus, a faucibus quam malesuada ut. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec eget dolor euismod turpis lacinia gravida consequat a diam. Suspendisse venenatis turpis ex, eget consequat lorem tempor varius. Mauris blandit massa magna, eget vulputate urna mollis a. Vivamus ut massa ipsum. Pellentesque risus nunc, pellentesque ac euismod id, vestibulum vel risus. Fusce vitae sodales mauris. Aliquam sed arcu venenatis, pretium elit in, pretium odio. Donec interdum dignissim odio, in tempor nunc aliquet nec. Proin urna justo, pulvinar vel tellus in, ullamcorper vehicula massa.
        </p>
      </main>
      <aside class="info-container">
        <BrokerInfo />
        <GettingStartInfo />
      </aside>
      <section className="settings">
        <RefreshRate value={metricRefresh} />
        <ConnectionSettings host={HOST} port={PORT} />
      </section>
      <footer class="footer">blah blah</footer>
    </div>

  );
}

export default App;
