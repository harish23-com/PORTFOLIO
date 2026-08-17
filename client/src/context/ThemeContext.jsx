import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const hexToRgb = (hex) => {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16) || 124;
  const g = parseInt(clean.substring(2, 4), 16) || 92;
  const b = parseInt(clean.substring(4, 6), 16) || 255;
  return `${r}, ${g}, ${b}`;
};

export const COLOR_THEMES = [
  {
    id: 'dark-purple',
    name: 'Dark Purple',
    accent: '#7c5cff',
    accent2: '#00d9c0',
    preview: ['#7c5cff', '#00d9c0'],
  },
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    accent: '#3b82f6',
    accent2: '#06b6d4',
    preview: ['#3b82f6', '#06b6d4'],
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    accent: '#22c55e',
    accent2: '#84cc16',
    preview: ['#22c55e', '#84cc16'],
  },
  {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    accent: '#f97316',
    accent2: '#ec4899',
    preview: ['#f97316', '#ec4899'],
  },
];

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('portfolio-theme-mode') || 'dark';
  });
  const [colorTheme, setColorTheme] = useState(() => {
    return localStorage.getItem('portfolio-color-theme') || 'dark-purple';
  });

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('data-theme', mode);
    localStorage.setItem('portfolio-theme-mode', mode);
  }, [mode]);

  useEffect(() => {
    const theme = COLOR_THEMES.find((t) => t.id === colorTheme) || COLOR_THEMES[0];
    document.documentElement.style.setProperty('--accent', theme.accent);
    document.documentElement.style.setProperty('--accent2', theme.accent2);
    document.documentElement.style.setProperty('--accent-rgb', hexToRgb(theme.accent));
    document.documentElement.style.setProperty('--accent2-rgb', hexToRgb(theme.accent2));
    localStorage.setItem('portfolio-color-theme', colorTheme);
  }, [colorTheme]);

  const toggleMode = () => setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ mode, toggleMode, colorTheme, setColorTheme, COLOR_THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
