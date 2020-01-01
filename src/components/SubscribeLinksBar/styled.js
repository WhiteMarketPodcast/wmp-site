import styled from 'styled-components'
import { white, primary } from 'style/colors'
import { sansSerif } from 'style/fonts'
import { onMobile } from 'style/mediaQueries'

export const Bar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${white};
  padding: 1rem;
  width: 100%;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${white};
    font-weight: 500;
    line-height: 1;
    margin: 0 0.5rem;
    filter: saturate(0%);
    transition: all 0.2s ease;

    &:hover,
    &:focus {
      filter: saturate(100%);
    }

    img,
    svg {
      font-size: 35px;
      height: 35px;

      ${onMobile} {
        font-size: 24px;
        height: 24px;
      }
    }

    span {
      margin-left: 0.5rem;
    }
  }
`

export const Links = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  max-width: 400px;
`

export const Title = styled.div`
  color: ${white};
  font-family: ${sansSerif};
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 1px;
  line-height: 1;
  margin: 0;
  margin-bottom: 0.8rem;
  text-transform: uppercase;
  padding: 0.2rem 0.5rem;
  background-color: ${primary};
`
