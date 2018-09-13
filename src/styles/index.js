import { injectGlobal } from 'styled-components';
import { onMobile, onTablet, onDesktop, onHighDefScreen } from './mediaQueries';
// import { black, white, darkGrey, emerald } from './colors';

// eslint-disable-next-line
injectGlobal`
  html {
    font-size: 16px;
    
    ${onMobile} { font-size: 16px; }
    ${onTablet} { font-size: 17px; }
    ${onDesktop} { font-size: 18px; }
    ${onHighDefScreen} { font-size: 20px; }
  }
`;
