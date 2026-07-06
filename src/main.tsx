import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MsalProvider } from '@azure/msal-react'
import { msalInstance } from './config/msalConfig.ts'
import { LoadingProvider } from './utils/LoadingContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoadingProvider>
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    </LoadingProvider>
  </StrictMode>,
)
