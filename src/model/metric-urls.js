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
export const MetricUrls = [
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
