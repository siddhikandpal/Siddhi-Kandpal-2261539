import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ShortUrl } from '../types/types';
import log from '../components/LoggingMiddleware';

const StatsPage: React.FC = () => {
  const [urls, setUrls] = useState<ShortUrl[]>([]);
  const [selectedUrl, setSelectedUrl] = useState<ShortUrl | null>(null);

  useEffect(() => {
    const loadUrls = async () => {
      try {
        // In a real app, you would fetch this from an API
        const savedUrls = localStorage.getItem('shortUrls');
        if (savedUrls) {
          setUrls(JSON.parse(savedUrls));
          await log('frontend', 'info', 'stats', 'Loaded URLs for statistics');
        }
      } catch (error) {
        await log('frontend', 'error', 'stats', `Failed to load URLs: ${error}`);
      }
    };
    
    loadUrls();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        URL Statistics
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          All Short URLs
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Short URL</TableCell>
                <TableCell>Original URL</TableCell>
                <TableCell>Clicks</TableCell>
                <TableCell>Expires</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {urls.map((url) => (
                <TableRow 
                  key={url.id} 
                  hover 
                  onClick={() => setSelectedUrl(url)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>/{url.shortCode}</TableCell>
                  <TableCell>{url.originalUrl.substring(0, 30)}...</TableCell>
                  <TableCell>{url.clicks}</TableCell>
                  <TableCell>{new Date(url.expiresAt).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      
      {selectedUrl && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Detailed Statistics for /{selectedUrl.shortCode}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Original URL: <a href={selectedUrl.originalUrl} target="_blank" rel="noopener noreferrer">{selectedUrl.originalUrl}</a>
          </Typography>
          <Typography variant="body1" gutterBottom>
            Created: {new Date(selectedUrl.createdAt).toLocaleString()}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Expires: {new Date(selectedUrl.expiresAt).toLocaleString()}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Total Clicks: {selectedUrl.clicks}
          </Typography>
          
          {selectedUrl.clickData && selectedUrl.clickData.length > 0 && (
            <>
              <Typography variant="h6" sx={{ mt: 2 }} gutterBottom>
                Click Details
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Timestamp</TableCell>
                      <TableCell>Source</TableCell>
                      <TableCell>Location</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedUrl.clickData.map((click, index) => (
                      <TableRow key={index}>
                        <TableCell>{new Date(click.timestamp).toLocaleString()}</TableCell>
                        <TableCell>{click.source}</TableCell>
                        <TableCell>{click.location}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Paper>
      )}
    </Container>
  );
};

export default StatsPage;