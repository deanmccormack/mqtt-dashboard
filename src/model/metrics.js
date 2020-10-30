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


// order! Metrics=MetricsUrls
const DefaultMetrics = {
  [CLUSTER_SIZE]: 4,
  [MSG_INCOMING_TOTAL_COUNT]: 16800,
  [MSG_OUTGOING_TOTAL_COUNT]: 16800,
  [MSG_QUEUED_COUNT]: 0,
  [MSG_RETAINED_CURRENT_COUNT]: 1456,
  [NETWORKING_BYTES_READ_TOTAL]: 219889887,
  [NETWORKING_BYTES_WRITE_TOTAL]: 219889887,
  [NETWORKING_CONNECTIONS_CURRENT]: 1278,
  [SESSSIONS_OVERALL_COUNT]: 1566,
  [SUB_OVERALL_CURRENT_COUNT]: 2566,
};

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

const MetricCountGenerator = {
  [CLUSTER_SIZE]: () => 4,
  [MSG_INCOMING_TOTAL_COUNT]: () => randomNumber(16800, 17000),
  [MSG_OUTGOING_TOTAL_COUNT]: () => randomNumber(16800, 17000),
  [MSG_RETAINED_CURRENT_COUNT]: () => randomNumber(2456, 4000),
  //[MSG_QUEUED_COUNT]: () => randomNumber(0, 2000),

  [NETWORKING_BYTES_READ_TOTAL]: () => 17000 + randomNumber(1500, 2700),
  [NETWORKING_BYTES_WRITE_TOTAL]: () => 14000 + randomNumber(1500, 2700),
  [NETWORKING_CONNECTIONS_CURRENT]: () => randomNumber(1278, 1400),
  //[SESSSIONS_OVERALL_COUNT]: () => randomNumber(5000, 7000),
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
    return prevSlice[MSG_QUEUED_COUNT] + queueDelta;
  };

  console.log(getQueueCnt());

  return {
    ...newMetrics,
    [SESSSIONS_OVERALL_COUNT]: getOverallSessionCnt(),
    [MSG_QUEUED_COUNT]: getQueueCnt(),
  };
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

const getGaugeChartData = (historyMetrics) => ([
  {x: 1, y: 2},
  {x: 2, y: 2},
  {x: 3, y: 2},
  {x: 0, y: 2},
  {x: 0, y: 2},
  {x: 0, y: 2},
]);

const getConnectionChartData = (historyMetrics) => ([
  {x: 1, y: 10},
  {x: 2, y: 5},
  {x: 3, y: 15}
]);

const getNetworkStreamChartData  = (historyMetrics) => ([
  {x: 1, y: 10},
  {x: 2, y: 5},
  {x: 3, y: 15}
]);

export {
  getConnectionChartData,
  getGaugeChartData,
  getMessageStreamChartData,
  getNetworkStreamChartData,
  nextMetricsSlice,
  ConnectionMetricsKeys,
  DefaultMetrics,
  MessageMetricsKeys,
  MetricCountGenerator,
  NetworkMetricsKeys,
  SubscriptionMetricsKeys,
};
