import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './auth/authConfig';
import { MsalProvider } from '@azure/msal-react';

// import { BrowserRouter } from 'react-router-dom';


const msalInstance = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <MsalProvider instance={msalInstance}>
      {/* <BrowserRouter> */}
        <App />
      {/* </BrowserRouter> */}
    </MsalProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
