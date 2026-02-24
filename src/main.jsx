import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from '@/app/store'
import App from './App.jsx'
import './index.css'

const mountApp = () => {
  const rootEl = document.getElementById('root')
  if (!rootEl) return
  createRoot(rootEl).render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  )
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', mountApp)
} else {
  mountApp()
}
