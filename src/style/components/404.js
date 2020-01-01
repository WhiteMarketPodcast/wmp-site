import styled from 'styled-components'
import { LinkButton as Link } from 'style/components'
import { white, primary } from '../colors'
import { onMobile } from '../mediaQueries'

export const Section404 = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${primary};
  color: ${white};
  height: 100%;
  padding: 2rem 0;

  ${onMobile} {
    padding-top: 0;
  }
`

export const H1 = styled.h1`
  color: ${white};
  font-size: 10rem;
  margin: 0 auto 1rem auto;
`

export const LinkButton = styled(Link)`
  border: 1px solid ${white};
  color: ${white};
  margin: 1rem auto;
`

export const TextCenter = styled.div`
  margin: 1rem;
  text-align: center;

  ${onMobile} {
    white-space: pre;
  }
`
