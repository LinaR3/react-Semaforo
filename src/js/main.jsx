import React from 'react'
import ReactDOM from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap"
import '../styles/index.css'  
import TrafficLight from './components/Home';  

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TrafficLight />
  </React.StrictMode>,
)