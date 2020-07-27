import posed from 'react-pose'
import styled from 'styled-components'

import {
  DESKTOP_NAV_HEIGHT,
  MOBILE_NAV_HEIGHT,
} from 'components/Navbar/constants'
import { onMobile } from 'style/mediaQueries'
import { pageFade } from 'style/poses'

const div = posed.div(pageFade)

export const PageFade = styled(div)`
  flex: 1 1 auto;
  padding-top: ${DESKTOP_NAV_HEIGHT};

  ${onMobile} {
    padding-top: ${MOBILE_NAV_HEIGHT};
  }
`
