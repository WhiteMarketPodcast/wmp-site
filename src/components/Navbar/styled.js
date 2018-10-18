import styled from 'styled-components';
import posed from 'react-pose';
import Link from 'components/Link';
import { emerald, white } from 'style/colors';
import { onMobile } from 'style/mediaQueries';
import { DESKTOP_NAV_HEIGHT, MOBILE_NAV_HEIGHT } from './constants';

const nav = posed.nav({
  show: { y: 0, transition: { ease: 'easeInOut' } },
  hide: { y: '-100%', delay: 300, transition: { ease: 'easeInOut' } },
});

export const Nav = styled(nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 900;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background-color: ${emerald};
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  padding: 0;

  @supports (filter: invert(0.7)) {
    background-color: ${white};
  }

  h1 {
    display: flex;
    background-color: transparent;
    margin: 0;
    padding: 0;
  }
`;

export const LogoLink = styled(Link)`
  z-index: 1001;
`;

export const Logo = styled.img`
  height: ${DESKTOP_NAV_HEIGHT};
  padding: 0 1rem;
  transition: all 0.3s ease;

  @supports (filter: invert(0.7)) {
    filter: invert(0);

    &:not(.open) {
      filter: invert(0.7);
    }
  }

  ${onMobile} {
    height: ${MOBILE_NAV_HEIGHT};
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

  ${onMobile} {
    svg {
      height: 30px;
      width: 30px;
    }
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
    staggerChildren: 100,
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
  closed: { opacity: 0, y: 10, transition: { duration: 0 } },
});

export const MenuItem = styled(li)`
  margin: 0 auto;
  line-height: 1;
  padding: 1rem;
`;

export const NavLink = styled(Link)`
  color: ${white};
  font-size: 1.5rem;
  font-weight: 600;
`;
