import { style } from '@vanilla-extract/css';
import * as globalStyles from '../global-styles.css';

export const wrapper = style({
  color: '#5ab303',
  fontSize: '2.5rem',
  fontWeight: 900,
  lineHeight: 1,
});

export const dropShadowType = style({
  lineHeight: 1,
  color: '#6b0908',
  textShadow: '2px 2px 0 #ee952f',
  // textShadow: '2px 2px 0 linear-gradient(to right, #ee952f #5ab303)',
  fontFamily: globalStyles.vars.font.prompt,
});
