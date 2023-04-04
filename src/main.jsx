import React from 'react'
import ReactDOM from 'react-dom/client'
import { global, reset } from "./styles";
import { Global } from "@emotion/react";
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Global styles={[global, reset]} />
    <App />
  </React.StrictMode>,
)
