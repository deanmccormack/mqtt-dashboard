import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/react-vis/dist/style.css';

import DataPumpContext from './context/DataPumpContext';
import createDataPump from './model/data-pump';

ReactDOM.render(
  <React.StrictMode>
    <DataPumpContext.Provider value={createDataPump()} >
      <App />
    </DataPumpContext.Provider >
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
