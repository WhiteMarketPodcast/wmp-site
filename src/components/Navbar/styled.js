import styled from 'styled-components';
import { black, emerald } from 'styles/colors';

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 5rem;
  padding: 0 1.5rem;
  flex-wrap: wrap;

  h1 {
    display: flex;
    background-color: transparent;
    margin: 0;
    padding: 0;
  }

  a {
    display: flex;
    color: ${black};
    font-weight: 600;
    margin: 0 1rem;
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      color: ${emerald};
      filter: contrast(150%);
    }
  }
`;

export const Logo = styled.img`
  height: 5rem;
  filter: invert(1);
`;

export const FlexRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;
