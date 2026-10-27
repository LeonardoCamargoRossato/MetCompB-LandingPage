import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { PreferencesProvider } from './context/Preferences'
import './styles/global.css'
import './styles/enhancements.css'
import './styles/tutorial.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PreferencesProvider><App/></PreferencesProvider>
  </StrictMode>
)
