import React from 'react';
import Link from 'components/Link';
import logo from 'img/White-market-transp-logo.png';
import { Nav, Logo, FlexRow } from './styled';

const Navbar = () => (
  <Nav>
    <div>
      <Link to="/">
        <h1>
          <Logo src={logo} alt="White Market Podcast" />
        </h1>
      </Link>
    </div>
    <FlexRow>
      <Link to="/about">About</Link>
      <Link to="/products">Products</Link>
    </FlexRow>
  </Nav>
);

export default Navbar;
