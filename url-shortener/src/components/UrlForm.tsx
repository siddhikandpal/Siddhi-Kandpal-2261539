import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import log from './LoggingMiddleware';
import { UrlFormData } from '../types/types';

interface UrlFormProps {
  onSubmit: (data: UrlFormData) => Promise<void>;
}

const UrlForm: React.FC<UrlFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<UrlFormData>({
    originalUrl: '',
    validityMinutes: 30,
    customShortCode: ''
  });
  const [errors, setErrors] = useState<Partial<UrlFormData>>({});

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Partial<UrlFormData> = {};
    if (!formData.originalUrl) {
      newErrors.originalUrl = 'URL is required';
      await log('frontend', 'error', 'validation', 'URL is required');
    } else if (!validateUrl(formData.originalUrl)) {
      newErrors.originalUrl = 'Invalid URL format';
      await log('frontend', 'error', 'validation', 'Invalid URL format');
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    try {
      await onSubmit(formData);
      setFormData({
        originalUrl: '',
        validityMinutes: 30,
        customShortCode: ''
      });
      setErrors({});
      await log('frontend', 'info', 'form', 'URL submitted successfully');
    } catch (error) {
      await log('frontend', 'error', 'form', `Form submission failed: ${error}`);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Shorten a URL
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Original URL"
              variant="outlined"
              value={formData.originalUrl}
              onChange={(e) => setFormData({...formData, originalUrl: e.target.value})}
              error={!!errors.originalUrl}
              helperText={errors.originalUrl}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Validity (minutes)"
              type="number"
              variant="outlined"
              value={formData.validityMinutes}
              onChange={(e) => setFormData({...formData, validityMinutes: Number(e.target.value)})}
              inputProps={{ min: 1 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Custom Short Code (optional)"
              variant="outlined"
              value={formData.customShortCode}
              onChange={(e) => setFormData({...formData, customShortCode: e.target.value})}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Shorten URL
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default UrlForm;