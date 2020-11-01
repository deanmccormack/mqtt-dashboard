import { MetricLabels } from '../labels/metric-labels';

import {
  NETWORKING_BYTES_WRITE_TOTAL,
  MSG_INCOMING_TOTAL_COUNT,
  MSG_OUTGOING_TOTAL_COUNT,
  MSG_QUEUED_COUNT,
  NETWORKING_BYTES_READ_TOTAL,
  NETWORKING_CONNECTIONS_CURRENT,
  MSG_RETAINED_CURRENT_COUNT,
  //SESSSIONS_OVERALL_COUNT,
  SUB_OVERALL_CURRENT_COUNT,
  TIME_STAMP,
} from '../types/metric-types';

const createSliceData = (x, y) => ({x, y});

const getMax = (a, b) => a > b
  ? a
  : b;

const getMaxProp = (a, prop) => a.reduce((acc, el) => getMax(acc, el[prop]), 0);
const getMaxY = (a) => getMaxProp(a, 'y');
//const getMaxX = (a) => getMaxProp(a, 'x');

const getCurrentMetrics = (metrics) => metrics[metrics.length -1];
const getCurrentMetricsValue = (metrics, key) => getCurrentMetrics(metrics)[key];

const getMessageStreamChartData = (historyMetrics, window, timeDelta) => {
  if (historyMetrics.length < 0) {
    return;
  }

  const windowMetrics = window < historyMetrics.length // timeDelta / 1000
    ? historyMetrics.slice(historyMetrics.length - window)
    : historyMetrics;

  const data = windowMetrics.reduce((acc, slice) => ({
    [MSG_INCOMING_TOTAL_COUNT]: [...acc[MSG_INCOMING_TOTAL_COUNT], createSliceData(slice[TIME_STAMP], slice[MSG_INCOMING_TOTAL_COUNT])],
    [MSG_OUTGOING_TOTAL_COUNT]: [...acc[MSG_OUTGOING_TOTAL_COUNT], createSliceData(slice[TIME_STAMP], slice[MSG_OUTGOING_TOTAL_COUNT])],
    [MSG_RETAINED_CURRENT_COUNT]: [...acc[MSG_RETAINED_CURRENT_COUNT], createSliceData(slice[TIME_STAMP], slice[MSG_RETAINED_CURRENT_COUNT])],
  }), {
    [MSG_INCOMING_TOTAL_COUNT]: [],
    [MSG_OUTGOING_TOTAL_COUNT]: [],
    [MSG_RETAINED_CURRENT_COUNT]: [],
  });

  const xDomain = [data[MSG_INCOMING_TOTAL_COUNT][0].x, data[MSG_INCOMING_TOTAL_COUNT][window -1].x];
  const yDomain = [0, getMax(getMaxY(data[MSG_INCOMING_TOTAL_COUNT]), getMaxY(data[MSG_OUTGOING_TOTAL_COUNT])) + 10000];

  return {
    data,
    xDomain,
    yDomain,
  }
};

const getGaugeChartData = (historyMetrics) => {
  const IN_THE_RED = 3000;
  const IN_THE_ORANGE = 2000;

  const msgCount = getCurrentMetricsValue(historyMetrics, MSG_QUEUED_COUNT);

  return {
    data: [{y: 10, x: msgCount }],
    xDomain: [0, IN_THE_RED + 1000],
    // FIXME: color constants
    color: msgCount > IN_THE_RED
      ? '#f83535'
      : msgCount > IN_THE_ORANGE
        ? '#e76208'
        : '#058f05',
  };
};

const getNetworkStreamChartData = (historyMetrics) => {
  const currWriteBytes = getCurrentMetricsValue(historyMetrics, NETWORKING_BYTES_WRITE_TOTAL);
  const currReadBytes =  getCurrentMetricsValue(historyMetrics, NETWORKING_BYTES_READ_TOTAL);

  const data = [
   {x: MetricLabels[NETWORKING_BYTES_WRITE_TOTAL], y: currWriteBytes},
   {x: MetricLabels[NETWORKING_BYTES_READ_TOTAL], y: currReadBytes}
  ];

  const yMax = ((y) => {
    switch (true) {
      case y < 500_000:
        return 500_000;
      case y < 2_000_000:
        return 2_000_000;
      case y < 10_000_000:
        return 10_000_000;
      default:
        return 40_000_000;
    }
  })(getMax(currWriteBytes, currReadBytes))

  const yDomain = [0, yMax];

  return {
    data,
    yDomain,
  };
};

const getConnectionChartData = (historyMetrics) => {

  const currConnections = getCurrentMetricsValue(historyMetrics, NETWORKING_CONNECTIONS_CURRENT);
  const currSubs = getCurrentMetricsValue(historyMetrics, SUB_OVERALL_CURRENT_COUNT);
  const data = [
    {x: MetricLabels[NETWORKING_CONNECTIONS_CURRENT], y: currConnections},
    {x: MetricLabels[SUB_OVERALL_CURRENT_COUNT], y: currSubs},
  ];

  const yMax = ((y) => {
    switch (true) {
      case y < 5000:
        return 5000;
      case y < 10000:
        return 10000;
      default:
        return 20000;
    }
  })(getMax(currConnections, currSubs))

  const yDomain = [0, yMax];

  return {
    data,
    yDomain,
  };
};

const getTotalConnectionChartData = (historyMetrics) => {
};

export {
  getConnectionChartData,
  getGaugeChartData,
  getMessageStreamChartData,
  getNetworkStreamChartData,
  getTotalConnectionChartData,
};
