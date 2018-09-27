import { injectGlobal } from 'styled-components';
import { onMobile, onDesktop } from './mediaQueries';
// import { black, white, darkGrey, emerald } from './colors';

// eslint-disable-next-line
injectGlobal`
  html {
    font-size: 18px;
    
    ${onMobile} { font-size: 18px; }
    ${onDesktop} { font-size: 19px; }
    @media screen and (min-width: 1400px) { font-size: 20px; }
  }

  a, button {
    cursor: pointer;
  }

  *:disabled {
    cursor: not-allowed;
  }
`;
