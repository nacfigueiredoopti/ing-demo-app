import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OptimizelyProvider, createInstance } from '@optimizely/react-sdk';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { optimizelyConfig } from './optimizely.config';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Accounts } from './components/Accounts';
import { Transfer } from './components/Transfer';
import { Savings } from './components/Savings';

// Create Optimizely instance
const optimizely = createInstance({
  sdkKey: optimizelyConfig.sdkKey,
  datafileOptions: optimizelyConfig.datafileOptions,
});

function App() {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    // Listen for datafile updates
    const onUpdate = () => {
      console.log('Optimizely datafile updated! Feature flags refreshed.');
      forceUpdate(prev => prev + 1); // Force re-render when datafile updates
    };

    // Listen for initial ready state
    const onReady = () => {
      console.log('Optimizely SDK ready');
    };

    // Subscribe to update events
    optimizely.onReady().then(onReady);
    const listenerId = optimizely.notificationCenter.addNotificationListener(
      'OPTIMIZELY_CONFIG_UPDATE',
      onUpdate
    );

    // Cleanup
    return () => {
      if (listenerId) {
        optimizely.notificationCenter.removeNotificationListener(listenerId);
      }
    };
  }, []);

  return (
    <OptimizelyProvider
      optimizely={optimizely}
      user={{ id: 'demo-user-123' }}
    >
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/savings" element={<Savings />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </OptimizelyProvider>
  );
}

export default App;
