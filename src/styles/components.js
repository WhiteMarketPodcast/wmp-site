import styled from 'styled-components';
import Link from 'components/Link';
import { emerald } from './colors';
import { onMobile } from './mediaQueries';

export const Card = styled.div`
  max-width: 60ch;
  margin: 2rem auto;
  padding: 2rem 0;

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
