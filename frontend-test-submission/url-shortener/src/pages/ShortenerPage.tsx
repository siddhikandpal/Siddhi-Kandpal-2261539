import { useState } from 'react';
import UrlForm from '../components/UrlForm';
import UrlList from '../components/UrlList';

export default function ShortenerPage() {
  const [urls, setUrls] = useState<string[]>([]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>URL Shortener</h1>
      <UrlForm onShorten={(url) => setUrls([...urls, url])} />
      <UrlList urls={urls} />
    </div>
  );
}