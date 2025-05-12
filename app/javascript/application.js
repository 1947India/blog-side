// app/javascript/packs/application.js or your entry point
import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from './components/auth/Router';
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  if (root) {
    const reactRoot = ReactDOM.createRoot(root);
    reactRoot.render(
      <React.StrictMode>
        <AppRouter />  {/* Your main router */}
      </React.StrictMode>
    );
  }
});
