import { globalStyle, createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme('#maribu-root', {
  color: {
    background: '#f6eac7',
    content: '#494B47',
  },
  font: {
    prompt: "'Prompt', sans-serif",
    figtree: "'Figtree', sans-serif",
    martianmono: "'Martian Mono', monospace",
  },
});

globalStyle(':root', {
  boxSizing: 'border-box',
});

globalStyle('*, *::before, *::after', {
  boxSizing: 'inherit',
  margin: 0,
});

globalStyle('#maribu-root', {
  minHeight: '100vh',
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gridTemplateRows: '1fr',
  backgroundColor: vars.color.background,
  color: vars.color.content,
  fontFamily: vars.font.figtree,
});
