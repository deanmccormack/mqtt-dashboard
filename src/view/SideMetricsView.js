import PropTypes from 'prop-types';

import {
  ConnectionMetricsKeys,
  MessageMetricsKeys,
  NetworkMetricsKeys,
  SubscriptionMetricsKeys,
} from '../model/metrics';

import { MetricLabels } from '../labels/metric-labels';

import MetricsContainer from '../components/MetricsContainer';

export default function SideMetricsView({
  metrics,
}) {
  return (
    <>
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
    </>
  );
};
SideMetricsView.propTypes = {
  // FIXME: shapeOf
  metrics: PropTypes.object,
};
