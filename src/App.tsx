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
  const [datafileReady, setDatafileReady] = useState(false);

  useEffect(() => {
    // Listen for datafile updates
    const onUpdate = () => {
      console.log('Optimizely datafile updated! Feature flags refreshed.');
      setDatafileReady(prev => !prev); // Toggle to force re-render
    };

    // Listen for initial ready state
    const onReady = () => {
      console.log('Optimizely SDK ready');
      setDatafileReady(true);
    };

    // Subscribe to update events
    optimizely.onReady().then(onReady);
    optimizely.notificationCenter.addNotificationListener(
      'OPTIMIZELY_CONFIG_UPDATE',
      onUpdate
    );

    // Cleanup
    return () => {
      optimizely.notificationCenter.removeNotificationListener(
        'OPTIMIZELY_CONFIG_UPDATE',
        onUpdate
      );
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
