import styled from 'styled-components';
import { black, white, primary } from 'style/colors';
import { sansSerif } from 'style/fonts';
import { onMobile } from 'style/mediaQueries';

export const Bar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${white};
  padding: 1rem;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${white};
    /* filter: saturate(0%); */
    font-weight: 500;
    line-height: 1;
    margin: 0 0.5rem;
    transition: filter 0.2s ease;

    &:hover,
    &:focus {
      /* filter: saturate(100%); */
    }

    img,
    svg {
      font-size: 35px;
      height: 35px;
    }

    span {
      margin-left: 0.5rem;
    }
  }
  ${onMobile} {
    /*  */
  }
`;

export const Links = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h3`
  color: ${white};
  font-family: ${sansSerif};
  font-size: 0.8rem;
  font-weight: 500;
  margin: 0;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
`;
