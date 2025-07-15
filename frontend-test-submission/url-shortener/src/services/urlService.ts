interface UrlEntry {
  original: string;
  shortCode: string;
  expiry: Date;
  clicks: number;
  createdAt: Date;
}

class UrlShortenerService {
  private urlMap = new Map<string, UrlEntry>();

  shortenUrl(original: string, validityMinutes = 30, customCode?: string): string {
    // Validate URL
    if (!this.isValidUrl(original)) throw new Error("Invalid URL");

    const shortCode = customCode || this.generateShortCode();
    const expiry = new Date(Date.now() + validityMinutes * 60000);

    this.urlMap.set(shortCode, {
      original,
      shortCode,
      expiry,
      clicks: 0,
      createdAt: new Date()
    });

    return `http://localhost:3000/${shortCode}`;
  }

  private generateShortCode(): string {
    return Math.random().toString(36).substring(2, 8);
  }

  private isValidUrl(url: string): boolean {
    try { new URL(url); return true; } 
    catch { return false; }
  }
}

export const urlService = new UrlShortenerService();