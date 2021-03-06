import { createGlobalStyle } from 'styled-components'

import { lightGrey, primary, primaryDark } from './colors'
import { onDesktop, onMobile } from './mediaQueries'

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 17px;
    
    ${onMobile} { font-size: 17px; }
    ${onDesktop} { font-size: 18px; }
    @media screen and (min-width: 1400px) { font-size: 20px; }
  }

  a, button {
    cursor: pointer;
  }

  button {
    -webkit-appearance: none;
    border: 0;
    background: none;
    color: inherit;
    padding: 0;
    font-family: inherit;
    font-size: 1em;
    text-align: inherit;

    &:focus {
      outline: thin dotted currentColor;
    }

    &::-moz-focus-inner {
      border: 0;
    }
  }

  *:disabled {
    cursor: not-allowed;
  }

  blockquote {
    font-style: italic;
    border-left: 0.3rem solid ${primaryDark};
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

  #___gatsby > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
  }

  body.four-oh-four {
    background-color: ${primary};
  }

  strong {
    font-weight: 600;
  }

  .gatsby-image-wrapper.fill {
    position: absolute !important;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(359deg);
    }
  }

  .spin {
    animation: spin 0.5s infinite linear;
  }
`

export default GlobalStyle
