import React from 'react';
import ReactDOM from 'react-dom';
import './App.css'; // Your main CSS
// Remove or adjust the following if not needed
// import './styles.css'; // Import if moved to src/
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
