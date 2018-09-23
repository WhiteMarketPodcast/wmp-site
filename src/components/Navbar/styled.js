import styled from 'styled-components';
import posed from 'react-pose';
import Link from 'components/Link';
import { emerald, white } from 'styles/colors';

export const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 900;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${white};
  min-height: 5rem;
  padding: 0;
  flex-wrap: wrap;

  h1 {
    display: flex;
    background-color: transparent;
    margin: 0;
    padding: 0;
  }
`;

export const Logo = styled.img`
  height: 5rem;
  padding: 0 1rem;
  transition: all 0.3s ease;
  z-index: 1001;

  &:not(.open) {
    filter: invert(1);
  }
`;

export const Button = styled.button`
  display: flex;
  background-color: transparent;
  border: 0;
  padding: 0.5rem;
  margin: 0 1rem;
  z-index: 1001;

  .open {
    fill: ${white};
  }
`;

export const FlexRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const easeInOut = { ease: 'easeInOut' };
const ul = posed.ul({
  open: {
    scaleX: 1,
    delayChildren: 300,
    staggerChildren: 80,
    transition: easeInOut,
  },
  closed: { scaleX: 0, transition: easeInOut },
});

export const Menu = styled(ul)`
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${emerald};
  list-style: none;
  margin: 0;
  padding: 0;
  transform: scaleX(0);
  transform-origin: right;
  z-index: 1000;
`;

const li = posed.li({
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: 5, transition: { duration: 0 } },
});

export const MenuItem = styled(li)`
  margin: 0 auto;
  line-height: 1;
  padding: 1rem;
`;

export const NavLink = styled(Link)`
  color: ${white};
  font-size: 2rem;
  font-weight: 600;
`;
