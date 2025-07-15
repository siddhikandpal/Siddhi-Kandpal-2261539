import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import UrlForm from '../components/UrlForm';
import UrlList from '../components/UrlList';
import { shortenUrl } from '../utils/api';
import { ShortUrl, UrlFormData } from '../types/types';
import log from '../components/LoggingMiddleware';

const ShortenerPage: React.FC = () => {
  const [urls, setUrls] = useState<ShortUrl[]>([]);

  useEffect(() => {
    const loadUrls = async () => {
      try {
        // In a real app, you would fetch this from an API
        const savedUrls = localStorage.getItem('shortUrls');
        if (savedUrls) {
          setUrls(JSON.parse(savedUrls));
          await log('frontend', 'info', 'storage', 'Loaded URLs from local storage');
        }
      } catch (error) {
        await log('frontend', 'error', 'storage', `Failed to load URLs: ${error}`);
      }
    };
    
    loadUrls();
  }, []);

  const handleSubmit = async (formData: UrlFormData) => {
    try {
      // In a real app, you would call the API here
      const response = await shortenUrl(formData);
      const newUrl: ShortUrl = {
        id: Date.now().toString(),
        originalUrl: formData.originalUrl,
        shortCode: formData.customShortCode || Math.random().toString(36).substring(2, 8),
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + (formData.validityMinutes || 30) * 60000).toISOString(),
        clicks: 0,
        clickData: []
      };
      
      const updatedUrls = [...urls, newUrl];
      setUrls(updatedUrls);
      localStorage.setItem('shortUrls', JSON.stringify(updatedUrls));
      
      await log('frontend', 'info', 'shortener', `Created new short URL: ${newUrl.shortCode}`);
    } catch (error) {
      await log('frontend', 'error', 'shortener', `Failed to create short URL: ${error}`);
      throw error;
    }
  };

  const handleUrlClick = async (shortCode: string) => {
    try {
      const updatedUrls = urls.map(url => {
        if (url.shortCode === shortCode) {
          return {
            ...url,
            clicks: url.clicks + 1,
            clickData: [
              ...(url.clickData || []),
              {
                timestamp: new Date().toISOString(),
                source: 'web',
                location: 'Unknown' // In a real app, you would geolocate the IP
              }
            ]
          };
        }
        return url;
      });
      
      setUrls(updatedUrls);
      localStorage.setItem('shortUrls', JSON.stringify(updatedUrls));
      
      const urlToRedirect = urls.find(url => url.shortCode === shortCode);
      if (urlToRedirect) {
        window.open(urlToRedirect.originalUrl, '_blank');
        await log('frontend', 'info', 'redirection', `Redirected to: ${urlToRedirect.originalUrl}`);
      }
    } catch (error) {
      await log('frontend', 'error', 'redirection', `Failed to redirect: ${error}`);
    }
  };

  return (
    <Container maxWidth="md">
      <UrlForm onSubmit={handleSubmit} />
      <UrlList urls={urls} onUrlClick={handleUrlClick} />
    </Container>
  );
};

export default ShortenerPage;