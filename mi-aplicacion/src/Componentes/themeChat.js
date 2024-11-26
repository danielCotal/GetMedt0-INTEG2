import { createTheme } from '@mui/material/styles';

const themeChat = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    h1: { fontSize: '1.5rem', fontWeight: 700 },
    body1: { fontSize: '1rem' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  palette: {
    primary: { main: '#007bff' },
    secondary: { main: '#e0f7fa' },
    background: { default: '#ffffff', paper: '#f1f1f1' },
    text: { primary: '#212121', secondary: '#757575' },
  },
});

export default themeChat;
