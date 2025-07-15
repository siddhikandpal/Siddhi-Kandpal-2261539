import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Navigation from './components/Navigation';
import ShortenerPage from './pages/ShortenerPage';
import StatsPage from './pages/StatsPage';
import log from './components/LoggingMiddleware';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App: React.FC = () => {
  React.useEffect(() => {
    const initializeApp = async () => {
      try {
        await log('frontend', 'info', 'app', 'Application initialized');
      } catch (error) {
        console.error('Initial logging failed:', error);
      }
    };
    
    initializeApp();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<ShortenerPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/:shortCode" element={<ShortenerPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;