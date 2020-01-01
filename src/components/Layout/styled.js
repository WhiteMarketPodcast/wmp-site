import styled from 'styled-components'
import posed from 'react-pose'
import {
  MOBILE_NAV_HEIGHT,
  DESKTOP_NAV_HEIGHT,
} from 'components/Navbar/constants'
import { pageFade } from 'style/poses'
import { onMobile } from 'style/mediaQueries'

const div = posed.div(pageFade)

export const PageFade = styled(div)`
  flex: 1 1 auto;
  padding-top: ${DESKTOP_NAV_HEIGHT};
  will-change: opacity;

  ${onMobile} {
    padding-top: ${MOBILE_NAV_HEIGHT};
  }
`
