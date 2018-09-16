import styled from 'styled-components';
import Link from 'components/Link';
import { emerald, white } from './colors';
import { onMobile } from './mediaQueries';

export const BlogPreviewContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  min-height: calc(100vh - 7rem);
  padding: 5rem 5vw 2rem 5vw;

  ${onMobile} {
    display: block;
    padding: 0;
  }
`;

export const BlogPreviewBG = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  ${onMobile} {
    position: relative;
    bottom: inherit;
    height: 40vh;
  }
`;

export const BlogPreviewCard = styled.div`
  position: relative;
  background-color: ${white};
  /* margin: 2rem auto; */
  padding: 2rem;
  max-width: 60ch;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;

  ${onMobile} {
    padding: 1rem;
    margin: 0 0.5rem;
    top: -2rem;
  }

  h2 {
    margin: 0;
  }

  p {
    margin-top: 0;
  }

  a:hover {
    filter: contrast(200%);
  }
`;

export const PaddedSection = styled.section`
  margin: 0 auto;
  padding: 2rem;
  max-width: 60ch;

  ${onMobile} {
    padding: 2rem 1rem;
  }

  * {
    max-width: 100%;
  }
`;

export const LinkButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${emerald};
  padding: 0.8em 1.5em;
`;
