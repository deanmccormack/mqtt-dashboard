import { useState } from 'react';

import './App.css';

import { CLUSTER_SIZE } from './types/metric-types';

import { MetricLabels } from './labels/metric-labels';

import useMetricDataPump from './hooks/useMetricDataPump';

import ClusterInfo from './components/ClusterInfo';
import Footer from './components/Footer';
import Header from './components/Header';
import InfoContainer from './components/InfoContainer';
import SettingsContainer from './components/SettingsContainer';

import ChartView from './view/ChartView';
import SideMetricsView from './view/SideMetricsView';

const PORT = '8000';

const HOST = 'broker.hivemq.com';

const METRIC_REFRESH = 2000;

function App() {

  const [metricRefresh, setMetricRefresh] = useState(METRIC_REFRESH);
  const [metrics, historyMetrics] = useMetricDataPump({ metricRefresh });

  return (
    <div className="grid-container">
      <Header >
        <ClusterInfo label={MetricLabels[CLUSTER_SIZE]} value={metrics[CLUSTER_SIZE]} />
      </Header >
      <div className="main-row">
        <aside className="side-metrics">
          <SideMetricsView metrics={metrics} />
        </aside>
        <main className="main">
          <ChartView historyMetrics={historyMetrics}/>
        </main>
        <InfoContainer />
      </div>
      <SettingsContainer host={HOST} port={PORT} refreshRate={metricRefresh} />
      <Footer />
    </div>

  );
}

export default App;
