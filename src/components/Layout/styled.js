import styled from 'styled-components';
import {
  MOBILE_NAV_HEIGHT,
  DESKTOP_NAV_HEIGHT,
} from 'components/Navbar/styled';
import { onMobile } from 'style/mediaQueries';

export const Main = styled.main`
  padding-top: ${DESKTOP_NAV_HEIGHT};

  ${onMobile} {
    padding-top: ${MOBILE_NAV_HEIGHT};
  }
`;
