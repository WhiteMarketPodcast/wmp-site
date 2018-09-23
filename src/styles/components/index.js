import styled from 'styled-components';
import Link from 'components/Link';
import { emerald } from '../colors';
import { onMobile } from '../mediaQueries';

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

export * from './blogPostPage';
export * from './homePage';
