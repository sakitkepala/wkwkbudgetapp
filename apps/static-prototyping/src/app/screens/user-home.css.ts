import { style } from '@vanilla-extract/css';
import * as globalStyles from '../global-styles.css';

export const layout = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gridTemplateRows: 'auto 1fr auto',
});

export const header = style({
  paddingBlock: '1rem',
  textAlign: 'center',
});

// ------------------------------------

export const illustratedGreetings = style({
  marginBottom: '1rem',
  minHeight: '20vh',
  background: 'url(/assets/minted-money.jpg)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  mixBlendMode: 'multiply',
  opacity: 0.75,
});

// ------------------------------------

export const spendingPlanPrompt = style({
  marginInline: '1rem',
  textAlign: 'center',
});

export const linkCreatePlan = style({
  selectors: {
    'a&': {
      color: '#ee952f',
    },
  },
});

// ------------------------------------

export const menuList = style({
  margin: '1.5rem 1rem',
  overflow: 'hidden',
  borderRadius: '0.25rem',
  padding: '0.5rem',
  backgroundColor: '#ffffe3',

  display: 'flex',
  flexDirection: 'column',
});

export const menuItem = style({
  minWidth: 0,
  padding: 0,
  overflow: 'hidden',
  backgroundColor: '#ffffe3',
  borderRadius: '0.125rem',
  userSelect: 'none',
  cursor: 'pointer',

  selectors: {
    'button&': {
      border: 'none',
      textAlign: 'left',
    },
    '&:hover, &:focus, &:active': {
      backgroundColor: '#f6eac7',
    },
  },

  display: 'flex',
  alignItems: 'center',
});

export const menuLabel = style({
  flex: 1,
  minWidth: 0,
  padding: '1.25rem',
  paddingRight: '0.5rem',
});

export const menuLabelText = style({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',

  color: '#6b0908',
  fontFamily: globalStyles.vars.font.prompt,
  fontSize: '1.25rem',
  fontWeight: 600,
});

export const menuRightIcon = style({
  flex: '0 0 auto',
  marginRight: '0.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const fakeIcon = style({
  display: 'inline-block',
  height: 43,
  width: 43,
  color: '#f2f6bb',
  fontSize: 36,
  textAlign: 'center',
  verticalAlign: 'middle',
});
