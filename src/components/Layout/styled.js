import styled from 'styled-components';
import {
  MOBILE_NAV_HEIGHT,
  DESKTOP_NAV_HEIGHT,
} from 'components/Navbar/constants';
import { onMobile } from 'style/mediaQueries';

export const Main = styled.main`
  padding-top: ${DESKTOP_NAV_HEIGHT};
  flex: 1 1 auto;

  ${onMobile} {
    padding-top: ${MOBILE_NAV_HEIGHT};
  }
`;
