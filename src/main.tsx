
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Improve initial loading by wrapping in a DOMContentLoaded event
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

function initApp() {
  const rootElement = document.getElementById("root");
  
  if (rootElement) {
    // Clear any existing content to prevent hydration issues
    if (rootElement.hasChildNodes()) {
      rootElement.innerHTML = '';
    }
    
    const root = createRoot(rootElement);
    
    // Add error boundary at the root level
    root.render(
      <App />
    );
  } else {
    console.error("Root element not found");
  }
}
