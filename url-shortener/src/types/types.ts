export interface ShortUrl {
  id: string;
  originalUrl: string;
  shortCode: string;
  createdAt: string;
  expiresAt: string;
  clicks: number;
  clickData?: ClickData[];
}

export interface ClickData {
  timestamp: string;
  source: string;
  location: string;
}

export interface UrlFormData {
  originalUrl: string;
  validityMinutes?: number;
  customShortCode?: string;
}