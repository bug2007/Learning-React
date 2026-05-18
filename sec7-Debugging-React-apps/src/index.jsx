import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.jsx';
import './index.css';

// we cud also import and wrap the StrictMode component around other components, not necessarily around the root component
ReactDOM.createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);
