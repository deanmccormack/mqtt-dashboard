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

export const MetricLabels = {
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
