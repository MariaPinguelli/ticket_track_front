import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
//import ResetStyle from './style/ResetStyle.tsx'
//import GlobalStyle from './style/GlobalStyle.tsx'
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyle from './style/GlobalStyle.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline />
    <GlobalStyle/>
    <App/>
  </React.StrictMode>,
)
