import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import PlayerContextProvider from './context/PlayerContext.jsx'
import { FirebaseProvider } from './context/FirebaseContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <FirebaseProvider>
    <PlayerContextProvider>
      <App />
    </PlayerContextProvider>
    </FirebaseProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
