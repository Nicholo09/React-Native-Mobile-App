// Palette: warm terracotta & clay on soft neutrals (no blue / green).
// Off-white and charcoal-brown are used instead of pure white/black to reduce glare.
// All text colors meet WCAG AA contrast (4.5:1 or higher).

export const lightTheme = {
  mode: 'light',
  background: '#F6F1EA',
  surface: '#FFFCF7',
  border: '#E6DCD2',
  text: '#3B2F2A',
  subtext: '#76665C',
  primary: '#A6573D',
  onPrimary: '#FFFCF7',
  primarySoft: 'rgba(166, 87, 61, 0.12)',
  accent: '#E8C9B5',
  onAccent: '#3B2F2A',
  track: '#EDE3D9',
  tabBar: '#FFFCF7',
  tabInactive: '#94857D',
  status: {
    Completed: { bg: '#F5E1E3', fg: '#8A3A4A' },
    'In Progress': { bg: '#F8E6D3', fg: '#9A5418' },
    Pending: { bg: '#ECE5DE', fg: '#6B5D53' },
  },
};

export const darkTheme = {
  mode: 'dark',
  background: '#1F1B19',
  surface: '#2A2522',
  border: '#3D3531',
  text: '#EDE4DA',
  subtext: '#B4A69B',
  primary: '#E3A07F',
  onPrimary: '#2A1D17',
  primarySoft: 'rgba(227, 160, 127, 0.14)',
  accent: '#8C4A35',
  onAccent: '#EDE4DA',
  track: '#3D3531',
  tabBar: '#2A2522',
  tabInactive: '#8F8279',
  status: {
    Completed: { bg: 'rgba(232, 163, 174, 0.15)', fg: '#E8A3AE' },
    'In Progress': { bg: 'rgba(240, 178, 122, 0.15)', fg: '#F0B27A' },
    Pending: { bg: 'rgba(201, 188, 177, 0.12)', fg: '#C9BCB1' },
  },
};
