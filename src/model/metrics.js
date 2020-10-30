import {
  CLUSTER_SIZE,
  NETWORKING_BYTES_WRITE_TOTAL,
  MSG_INCOMING_TOTAL_COUNT,
  MSG_OUTGOING_TOTAL_COUNT,
  MSG_QUEUED_COUNT,
  MSG_RETAINED_CURRENT_COUNT,
  NETWORKING_BYTES_READ_TOTAL,
  NETWORKING_CONNECTIONS_CURRENT,
  SESSSIONS_OVERALL_COUNT,
  SUB_OVERALL_CURRENT_COUNT,
} from '../types/metric-types';

const NetworkMetricsKeys = [
  NETWORKING_BYTES_READ_TOTAL,
  NETWORKING_BYTES_WRITE_TOTAL,
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
  NETWORKING_CONNECTIONS_CURRENT,
  SUB_OVERALL_CURRENT_COUNT,
];

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

const MetricCountGenerator = {
  [CLUSTER_SIZE]: () => 4,
  [MSG_INCOMING_TOTAL_COUNT]: () => randomNumber(25000, 29000),
  [MSG_OUTGOING_TOTAL_COUNT]: () => randomNumber(15000, 24000),
  [MSG_RETAINED_CURRENT_COUNT]: () => randomNumber(4000, 7000),
  [MSG_QUEUED_COUNT]: () => randomNumber(1200, 2700),

  [NETWORKING_BYTES_READ_TOTAL]: () => 17000 + randomNumber(1500, 2700),
  [NETWORKING_BYTES_WRITE_TOTAL]: () => 14000 + randomNumber(1500, 2700),
  [NETWORKING_CONNECTIONS_CURRENT]: () => randomNumber(15000, 2700),
  [SESSSIONS_OVERALL_COUNT]: () => randomNumber(5000, 7000),
  [SUB_OVERALL_CURRENT_COUNT]: () => randomNumber(12000, 21000),
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

// order! Metrics=MetricsUrls
const DefaultMetrics = {
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

export {
  getMessageStreamChartData,
  ConnectionMetricsKeys,
  DefaultMetrics,
  MessageMetricsKeys,
  MetricCountGenerator,
  NetworkMetricsKeys,
  SubscriptionMetricsKeys,
};
