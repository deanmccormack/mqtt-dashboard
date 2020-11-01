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

const SCREEN_REFRESH = 2000;

function App() {
  const [screenRefresh, setScreenRefresh] = useState(SCREEN_REFRESH);
  const [metrics, metricsStream] = useMetricDataPump({ screenRefresh });

  const [pauseOnMetrics, setPauseOnMetrics] = useState([]);
  const [isScreenPaused, setIsScreenPaused] = useState(false);

  const handleScreenPauseClick = (e) => {
    e.preventDefault();
    if (isScreenPaused) {
      setPauseOnMetrics([])
    } else {
      setPauseOnMetrics([...metricsStream]);
    }
    setIsScreenPaused(!isScreenPaused);
  }

  const getMetricSlices = (isScreenPaused) => isScreenPaused
    ? pauseOnMetrics
    : metricsStream;

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
          <ChartView
            metricsStream={getMetricSlices(isScreenPaused)}
            handleScreenPauseClick={handleScreenPauseClick}
            isScreenPaused={isScreenPaused}
          />
        </main>
        <InfoContainer />
      </div>
      <SettingsContainer host={HOST} port={PORT} refreshRate={screenRefresh} />
      <Footer />
    </div>
  );
}

export default App;
