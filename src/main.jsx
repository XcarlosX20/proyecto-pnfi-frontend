import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material'
const root = ReactDOM.createRoot(document.getElementById('root'))
const theme = createTheme({
  palette: {
    primary: {
      main: '#DC681B',
      secondary: '#F0932B',
      light: '#FFA76C'
    },
    secondary: {
      main: '#060C22'
    },
    error: {
      main: '#dc3545'
    },
    success: {
      main: '#198754'
    }
  }
})
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
