import styled from 'styled-components';
import {
  MOBILE_NAV_HEIGHT,
  DESKTOP_NAV_HEIGHT,
} from 'components/Navbar/styled';
import { onMobile } from 'styles/mediaQueries';

export const Main = styled.main`
  margin-top: ${DESKTOP_NAV_HEIGHT};

  ${onMobile} {
    margin-top: ${MOBILE_NAV_HEIGHT};
  }
`;
