import styled from 'styled-components';
import Link from 'components/Link';
import { emerald, white } from './colors';
import { onMobile } from './mediaQueries';

export const Card = styled.div`
  background-color: ${white};
  /* margin: 2rem auto; */
  padding: 2rem;
  max-width: 60ch;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  ${onMobile} {
    padding: 1rem;
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

export const CardBG = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: calc(100vh - 7rem);
  padding: 5rem 5vw 2rem 5vw;
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
