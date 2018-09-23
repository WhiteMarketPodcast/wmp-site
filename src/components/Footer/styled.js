import styled from 'styled-components';
import Link from 'components/Link';
import { black, white, emerald } from 'styles/colors';
import { onMobile } from 'styles/mediaQueries';

export const StyledFooter = styled.footer``;

export const CopyrightRow = styled.div`
  background-color: ${black};
  color: ${white};
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${onMobile} {
    flex-direction: column;

    > div:first-child {
      margin-bottom: 1rem;
    }
  }
`;

export const LicenceInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  justify-content: space-between;
  background-color: ${emerald};
  color: ${white};
  font-size: 0.8em;
  padding: 2rem;

  ${onMobile} {
    grid-template-columns: 1fr;
  }

  a {
    color: ${white};
    font-weight: 600;
  }
`;

export const SocialIcon = styled.i`
  font-size: 1.4rem;
`;

export const CCIcon = styled.i`
  font-size: 2rem;
  margin-right: 0.2rem;
`;

export const CCIconContainer = styled.div`
  margin-bottom: 0.5rem;
`;

export const SocialIconContainer = styled.div`
  text-align: right;
`;

export const SocialLink = styled(Link)`
  display: inline-block;
  margin-left: 0.6rem;
  color: ${white};

  &:hover {
    filter: unset;

    /* &.facebook {
      color: #3b5998;
    }

    &.twitter {
      color: #1da1f2;
    }

    &.mixcloud {
      color: #52aad8;
    }

    &.email {
      color: #1da1f2;
    }

    &.github {
      color: #f5f5f5;
    }

    &.rss {
      color: #f26522;
    } */
  }
`;
