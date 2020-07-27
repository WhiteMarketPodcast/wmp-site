import styled from 'styled-components'

import { primary, white } from 'style/colors'
import { BrandH1, FlexCenter, PaddedSection } from 'style/components'
import { onMobile } from 'style/mediaQueries'

export const TitleBG = styled(FlexCenter)`
  background-color: ${primary};
  width: 100%;
  padding: 5rem 2rem;
  text-align: center;

  ${onMobile} {
    padding: 3rem 1rem;
  }
`

export const Title = styled(BrandH1)`
  color: ${white};
  margin: 0 auto;
`

export const Section = styled(PaddedSection)`
  padding-top: 1rem;
  padding-bottom: 1rem;
`
