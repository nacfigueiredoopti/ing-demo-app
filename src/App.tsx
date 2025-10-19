import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OptimizelyProvider, createInstance, enums } from '@optimizely/react-sdk';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { optimizelyConfig } from './optimizely.config';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Accounts } from './components/Accounts';
import { Transfer } from './components/Transfer';
import { Savings } from './components/Savings';
import Insights from './components/Insights';

// Create Optimizely instance
const optimizely = createInstance({
  sdkKey: optimizelyConfig.sdkKey,
  datafileOptions: optimizelyConfig.datafileOptions,
});

function App() {
  const [updateKey, setUpdateKey] = useState(0);

  useEffect(() => {
    // Listen for datafile updates
    const onUpdate = () => {
      console.log('🔄 Optimizely datafile updated! Feature flags will refresh.');
      // Force re-render to propagate new flag values
      setUpdateKey(prev => prev + 1);
    };

    // Listen for initial ready state
    const onReady = () => {
      console.log('✅ Optimizely SDK ready');
      setUpdateKey(prev => prev + 1);
    };

    // Subscribe to update events using the correct enum
    optimizely.onReady().then(onReady);

    const notificationType = enums?.NOTIFICATION_TYPES?.OPTIMIZELY_CONFIG_UPDATE ||
                            'OPTIMIZELY_CONFIG_UPDATE';

    const listenerId = optimizely.notificationCenter?.addNotificationListener(
      notificationType,
      onUpdate
    );

    console.log('👂 Listening for Optimizely config updates...');

    // Cleanup
    return () => {
      if (listenerId && optimizely.notificationCenter) {
        optimizely.notificationCenter.removeNotificationListener(listenerId);
      }
    };
  }, []);

  return (
    <OptimizelyProvider
      optimizely={optimizely}
      user={{ id: 'demo-user-123' }}
      key={updateKey}
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
            <Route path="/insights" element={<Insights />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </OptimizelyProvider>
  );
}

export default App;
