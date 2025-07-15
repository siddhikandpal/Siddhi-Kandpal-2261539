import { useState, FormEvent } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { urlService } from '../services/urlService';

interface UrlFormProps {
  onShorten: (shortenedUrl: string) => void;
}

export default function UrlForm({ onShorten }: UrlFormProps) {
  const [url, setUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const shortened = urlService.shortenUrl(url);
      onShorten(shortened);
      setUrl('');
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Failed to shorten URL');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit}
      sx={{ 
        display: 'flex',
        gap: 2,
        alignItems: 'center',
        width: '100%'
      }}
    >
      <TextField
        label="Enter Long URL"
        variant="outlined"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        fullWidth
        required
        disabled={isSubmitting}
        placeholder="https://example.com"
      />
      <Button 
        type="submit" 
        variant="contained" 
        color="primary"
        disabled={isSubmitting || !url.trim()}
        sx={{ height: '56px', minWidth: '120px' }}
      >
        {isSubmitting ? 'Shortening...' : 'Shorten'}
      </Button>
    </Box>
  );
}