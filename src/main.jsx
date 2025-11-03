import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { LoadingProvider } from "./context/LoadingContext.jsx";
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <LoadingProvider>
    <BrowserRouter>
    <AuthProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
  </LoadingProvider>
  </React.StrictMode>
)