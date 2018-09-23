import styled from 'styled-components';
import { onDesktop } from 'styles/mediaQueries';

export const Main = styled.main`
  margin-top: 80px;

  ${onDesktop} {
    margin-top: 90px;
  }
`;
