import { injectGlobal } from 'styled-components';
import { onMobile, onDesktop } from './mediaQueries';
// import { black, white, darkGrey, emerald } from './colors';

// eslint-disable-next-line
injectGlobal`
  html {
    font-size: 16px;
    
    ${onMobile} { font-size: 16px; }
    ${onDesktop} { font-size: 18px; }
    @media screen and (min-width: 1400px) { font-size: 20px; }
  }
`;
