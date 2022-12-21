import { style } from '@vanilla-extract/css';
import * as globalStyles from '../global-styles.css';

export const layout = style({
  marginInline: '0.5rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

export const textCenter = style({
  textAlign: 'center',
});

// -------------------------------

export const header = style({
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: '1rem 0',
  padding: '1rem',
});

// -------------------------------

export const loginLayoutWrapper = style({
  marginTop: '3rem',
});

export const loginCard = style({
  padding: '1.25rem 1.25rem',
  borderRadius: '0.375rem',
  backgroundColor: '#ffffff',
  border: '1px solid #b7d37e',
});

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const field = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

export const label = style({
  display: 'block',
});

export const input = style({
  display: 'block',
  width: '100%',
  padding: '0.75rem',
  border: '1px solid #494B47',
  borderRadius: '0.25rem',
  fontSize: '1.125rem',
  fontFamily: globalStyles.vars.font.figtree,
});

export const action = style({
  marginTop: '0.75rem',
  display: 'flex',
  flexDirection: 'column',
});

export const signupLink = style({
  display: 'inline-block',
  position: 'relative',
  zIndex: 0,
  color: '#6b0908',
  fontWeight: 700,
  textDecoration: 'none',

  '::after': {
    content: ' ',
    position: 'absolute',
    insetInline: 0,
    top: 'calc(1em + 2px)',
    height: 1,
    backgroundColor: 'currentcolor',
  },
});

export const submit = style({
  padding: '0.75rem 1rem',
  borderRadius: '0.375rem',
  border: 'none',
  backgroundColor: '#87c941',
  color: '#494B47',
  fontSize: '1.125rem',
  fontFamily: globalStyles.vars.font.figtree,
});

export const footer = style({
  paddingBlock: '1rem',
  textAlign: 'center',
  color: '#af8169',
});
