import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'

// Configure Axios base URL:
// In development, if VITE_API_URL is not set, we use an empty string so Vite's proxy in vite.config.js is utilized.
// In production (deployed site), we use the deployed Render URL as a fallback if VITE_API_URL isn't explicitly defined.
axios.defaults.baseURL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://matrimonial-biodata-generator.onrender.com' : '');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
