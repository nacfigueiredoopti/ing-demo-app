// ING-inspired color theme

export const theme = {
  colors: {
    primary: '#FF6200', // ING Orange
    primaryDark: '#E55A00',
    primaryLight: '#FF7A29',
    secondary: '#2F3E4F', // Dark Blue/Gray
    background: '#F7F7F7',
    white: '#FFFFFF',
    text: {
      primary: '#2F3E4F',
      secondary: '#767676',
      light: '#FFFFFF',
    },
    success: '#00A755',
    error: '#D32F2F',
    warning: '#F57C00',
    border: '#E0E0E0',
  },
  fonts: {
    primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1440px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.12)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 20px rgba(0, 0, 0, 0.15)',
  },
};

export type Theme = typeof theme;
