import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import log from './LoggingMiddleware';

const Navigation: React.FC = () => {
  const handleNavClick = async (page: string) => {
    try {
      await log('frontend', 'info', 'navigation', `Navigated to ${page}`);
    } catch (error) {
      console.error('Logging failed:', error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          URL Shortener
        </Typography>
        <Button 
          color="inherit" 
          component={Link} 
          to="/" 
          onClick={() => handleNavClick('home')}
        >
          Shorten
        </Button>
        <Button 
          color="inherit" 
          component={Link} 
          to="/stats" 
          onClick={() => handleNavClick('stats')}
        >
          Statistics
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;