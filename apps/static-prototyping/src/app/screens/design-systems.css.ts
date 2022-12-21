import { style } from '@vanilla-extract/css';
import * as globalStyles from '../global-styles.css';

export const currencyLabel = style({
  fontFamily: globalStyles.vars.font.martianmono,
});

// ----------------------------------------

export const boxColorContainer = style({
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
});

export const boxColor = style({
  padding: '2rem',
  border: '1px solid transparent',
});

// ----------------------------------------

export const colorGreenDark1 = style({
  backgroundColor: '#494B47',
  color: '#f2f6bb',
});

export const colorGreenDark2 = style({
  backgroundColor: '#6F867D',
  color: '#f2f6bb',
});

// ----------------------------------------

export const colorGreen1 = style({
  backgroundColor: '#b7d37e',
});

export const colorGreen2 = style({
  backgroundColor: '#87c941',
});

export const colorGreen3 = style({
  backgroundColor: '#5ab303',
});

// ----------------------------------------

export const colorGreenLight1 = style({
  backgroundColor: '#ffffe3',
  color: '#af8169',
});

export const colorGreenLight2 = style({
  backgroundColor: '#f2f6bb',
  color: '#af8169',
});

export const colorGreenLight3 = style({
  backgroundColor: '#dae3b4',
});

// ----------------------------------------

export const colorBrown1 = style({
  backgroundColor: '#f6eac7',
  color: '#af8169',
});

export const colorBrown2 = style({
  backgroundColor: '#af8169',
  color: '#ffffe3',
});

export const colorBrown3 = style({
  backgroundColor: '#6b0908',
  color: '#ffffe3',
});

// ----------------------------------------

export const colorOrange1 = style({
  backgroundColor: '#ffca88',
  color: '#ffffe3',
});

export const colorOrange2 = style({
  backgroundColor: '#f9b061',
  color: '#ffffe3',
});

export const colorOrange3 = style({
  backgroundColor: '#ee952f',
  color: '#ffffe3',
});
