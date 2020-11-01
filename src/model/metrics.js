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
  TIME_STAMP,
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


// order! Metrics=MetricsUrls
const DefaultMetrics = {
  [CLUSTER_SIZE]: 4,
  [MSG_INCOMING_TOTAL_COUNT]: 16500,
  [MSG_OUTGOING_TOTAL_COUNT]: 16500,
  [MSG_QUEUED_COUNT]: 0,
  [MSG_RETAINED_CURRENT_COUNT]: 1456,
  [NETWORKING_BYTES_READ_TOTAL]: 21980,
  [NETWORKING_BYTES_WRITE_TOTAL]: 21980,
  [NETWORKING_CONNECTIONS_CURRENT]: 1278,
  [SESSSIONS_OVERALL_COUNT]: 1566,
  [SUB_OVERALL_CURRENT_COUNT]: 2566,
};

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

const MetricCountGenerator = {
  [CLUSTER_SIZE]: () => 4,
  [MSG_INCOMING_TOTAL_COUNT]: () => randomNumber(16500, 17000),
  [MSG_OUTGOING_TOTAL_COUNT]: () => randomNumber(16500, 17000),
  [MSG_RETAINED_CURRENT_COUNT]: () => randomNumber(2456, 4000),
  [NETWORKING_BYTES_READ_TOTAL]: () => randomNumber(2500, 4900),
  [NETWORKING_BYTES_WRITE_TOTAL]: () => randomNumber(2500, 4700),
  [NETWORKING_CONNECTIONS_CURRENT]: () => randomNumber(1278, 1400),
  [SUB_OVERALL_CURRENT_COUNT]: () => randomNumber(2566, 4000),
};

const nextMetricsSlice = (prevSlice) => {

  const newMetrics = Object.keys(MetricCountGenerator)
    .reduce((acc, metric, ) => ({
      ...acc,
      [metric]: MetricCountGenerator[metric](),
    }), {});

  const getOverallSessionCnt = () => {
    const sessionDelta = prevSlice[NETWORKING_CONNECTIONS_CURRENT] - newMetrics[NETWORKING_CONNECTIONS_CURRENT];
    return sessionDelta < 0
      ? prevSlice[SESSSIONS_OVERALL_COUNT]
      : prevSlice[SESSSIONS_OVERALL_COUNT] + sessionDelta;
  };

  const getQueueCnt = () => {
    const queueDelta = newMetrics[MSG_INCOMING_TOTAL_COUNT] - newMetrics[MSG_OUTGOING_TOTAL_COUNT];
    const cnt = prevSlice[MSG_QUEUED_COUNT] + queueDelta
    return cnt < 0
      ? 0
      : cnt;
  };

  return {
    ...newMetrics,
    [NETWORKING_BYTES_READ_TOTAL]: prevSlice[NETWORKING_BYTES_READ_TOTAL] + newMetrics[NETWORKING_BYTES_READ_TOTAL],
    [NETWORKING_BYTES_WRITE_TOTAL]: prevSlice[NETWORKING_BYTES_WRITE_TOTAL] + newMetrics[NETWORKING_BYTES_WRITE_TOTAL],
    [SESSSIONS_OVERALL_COUNT]: getOverallSessionCnt(),
    [MSG_QUEUED_COUNT]: getQueueCnt(),
    [TIME_STAMP]: Date.now() ,
  };
};


export {
  nextMetricsSlice,
  ConnectionMetricsKeys,
  DefaultMetrics,
  MessageMetricsKeys,
  MetricCountGenerator,
  NetworkMetricsKeys,
  SubscriptionMetricsKeys,
};
