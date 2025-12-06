'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((registration) => {
          console.log('Service Worker registered successfully:', registration);
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });

      // Handle page visibility for optimization
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          // Page is hidden
        } else {
          // Page is visible - refresh if needed
          if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({ type: 'CLIENTS_CLAIMED' });
          }
        }
      });
    }
  }, []);

  return null;
}
