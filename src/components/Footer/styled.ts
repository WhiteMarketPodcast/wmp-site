import styled from 'styled-components'

import Link from 'components/Link'
import { black, primaryDark, white } from 'style/colors'
import { onMobile } from 'style/mediaQueries'

export const StyledFooter = styled.footer`
  a {
    color: ${white};
  }
`

export const CopyrightRow = styled.div`
  background-color: ${black};
  color: ${white};
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  ${onMobile} {
    flex-direction: column-reverse;
    align-items: center;
    padding: 2rem 1rem;
    text-align: center;
    font-size: 0.9rem;

    > div {
      margin: 0.33rem 0;

      &:first-child {
        margin-bottom: 0;
      }
      &:last-child {
        margin-top: 0;
      }
    }
  }
`

export const LicenceInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  justify-content: space-between;
  background-color: ${primaryDark};
  color: ${white};
  font-size: 0.8em;
  padding: 2rem;

  ${onMobile} {
    grid-template-columns: 1fr;
    padding: 2rem 1rem;
  }

  a {
    color: ${white};
    font-weight: 600;
  }
`

export const CCIcon = styled.span`
  font-size: 2rem;
  line-height: 1;
  margin-right: 0.2rem;
`

export const CCIconContainer = styled.div`
  margin-bottom: 0.5rem;
`

export const SocialIconContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: right;

  ${onMobile} {
    text-align: center;
  }
`

export const SocialLink = styled(Link)`
  display: inline-block;
  color: ${white};
  margin-left: 0.6rem;
  line-height: 1.4rem;
  opacity: 0.8;

  &:hover {
    filter: unset;
    opacity: 1;
  }
`

export const PrivacyLink = styled(Link)`
  color: ${white};
  font-size: 0.8rem;
  text-align: center;
  opacity: 0.8;

  &:hover {
    filter: unset;
    opacity: 1;
  }
`
