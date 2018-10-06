import styled from 'styled-components';
import Link from 'components/Link';
import { emerald } from '../colors';
import { onMobile } from '../mediaQueries';

export const PaddedSection = styled.section`
  margin: 0 auto;
  padding: 2rem;
  padding-top: 0;
  max-width: 60ch;

  ${onMobile} {
    padding: 0 1rem 2rem 1rem;
  }

  * {
    max-width: 100%;
  }
`;

export const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FlexCenterWithMargin = styled(FlexCenter)`
  margin: 1.5rem 1rem;
`;

export const LinkButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${emerald};
  padding: 0.8em 1.5em;
`;

export const BrandH1 = styled.h1`
  margin: ${({ moreMarginOnTop }) => (moreMarginOnTop ? `3rem auto 1rem auto` : `2rem auto`)};
  padding: 0 0.3em;
  text-align: center;
`;

export const BrandH2 = styled.h2`
  margin: 2rem auto;
  padding: 0 0.3em;
  text-align: center;
`;

export * from './blogPostPage';
export * from './homePage';
