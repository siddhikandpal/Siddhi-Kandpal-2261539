import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Link } from '@mui/material';
import { ShortUrl } from '../types/types';
import log from './LoggingMiddleware';

interface UrlListProps {
  urls: ShortUrl[];
  onUrlClick: (shortCode: string) => void;
}

const UrlList: React.FC<UrlListProps> = ({ urls, onUrlClick }) => {
  const handleClick = async (shortCode: string) => {
    try {
      await log('frontend', 'info', 'navigation', `Redirecting to URL with code: ${shortCode}`);
      onUrlClick(shortCode);
    } catch (error) {
      await log('frontend', 'error', 'navigation', `Failed to redirect: ${error}`);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Your Short URLs
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Original URL</TableCell>
              <TableCell>Short URL</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Expires</TableCell>
              <TableCell>Clicks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {urls.map((url) => (
              <TableRow key={url.id}>
                <TableCell>
                  <Link href={url.originalUrl} target="_blank" rel="noopener">
                    {url.originalUrl.substring(0, 30)}...
                  </Link>
                </TableCell>
                <TableCell>
                  <Link 
                    href={`/${url.shortCode}`} 
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(url.shortCode);
                    }}
                  >
                    {window.location.host}/{url.shortCode}
                  </Link>
                </TableCell>
                <TableCell>{new Date(url.createdAt).toLocaleString()}</TableCell>
                <TableCell>{new Date(url.expiresAt).toLocaleString()}</TableCell>
                <TableCell>{url.clicks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UrlList;