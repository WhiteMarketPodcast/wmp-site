import styled from 'styled-components'

import Link from 'components/Link'

import { primary, white } from '../colors'
import { onMobile } from '../mediaQueries'

export const PaddedSection = styled.section`
  margin: 0 auto;
  padding: 2rem;
  padding-top: 0;
  max-width: 70ch;

  ${onMobile} {
    padding: 0 1rem 2rem 1rem;
  }

  * {
    max-width: 100%;
  }
`

export const PaddedTopBottom = styled.section`
  padding: 2rem 0;
`

export const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const FlexCenterColumn = styled(FlexCenter)`
  flex-direction: column;
`

export const FlexCenterWithMargin = styled(FlexCenter)`
  margin: 1.5rem 1rem;
`

export const LinkButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${primary};
  font-weight: 500;
  padding: 0.8em 1.5em;
`

export const BrandH1 = styled.h1<{ moreMarginOnTop?: boolean }>`
  position: relative;
  margin: ${({ moreMarginOnTop }) =>
    moreMarginOnTop ? `3rem auto 1rem auto` : `2rem auto`};
  padding: 0 0.3em;
  text-align: center;
`

export const TitleHighlight = styled.span`
  display: block;
  background-color: ${primary};
  color: ${white};
  margin: 0.5rem;
`

export const BrandH2 = styled.h2`
  margin: 2rem auto;
  padding: 0 0.3em;
  text-align: center;
`

const screenReaderOnlyStyle = `
  position: absolute;
  left: -100000px;
  height: 1px;
  width: 1px;
  overflow: hidden;
`
export const SrText = styled.span`
  ${screenReaderOnlyStyle};
`

export const SrOnly = styled.div`
  ${screenReaderOnlyStyle};
`

export * from './blogPostPage'
export * from './homePage'
