// Import React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom';

// Import the main App component
import App from './App';

// Import CSS or any global styles (optional)
import './index.css';

// Rendering the App component into the 'root' div in the index.html file
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
