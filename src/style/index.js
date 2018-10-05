import { injectGlobal } from 'styled-components';
import { onMobile, onDesktop } from './mediaQueries';
import { emerald, lightGrey } from './colors';
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

  blockquote {
    font-style: italic;
    border-left: 0.3rem solid ${emerald};
    padding: 1px 1rem;
    background-color: ${lightGrey};
    margin: 1rem auto;
    max-width: 50ch;

    p {
      &::before {
        content: '“';
      }
      &::after {
        content: '”';
      }
    }
  }

  cite {
    display: flex;
    justify-content: flex-end;

    &::before {
      content: "—";
      padding-right: 0.5rem;
    }
  }
`;
