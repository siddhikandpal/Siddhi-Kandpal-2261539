import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function UrlList({ urls }: { urls: string[] }) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <List>
      {urls.map((url) => (
        <ListItem key={url} secondaryAction={
          <IconButton onClick={() => copyToClipboard(url)}>
            <ContentCopyIcon />
          </IconButton>
        }>
          <ListItemText primary={url} />
        </ListItem>
      ))}
    </List>
  );
}