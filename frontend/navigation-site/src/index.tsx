import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Routes'  // <-- hier deine App mit Router und Routes

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

