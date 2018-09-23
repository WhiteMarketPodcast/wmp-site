import React, { Component } from 'react';
import Link from 'components/Link';
import { CloseIcon, MenuIcon } from 'mdi-react';
import logo from 'img/White-market-transp-logo.png';
import { Button, Logo, Menu, MenuItem, Nav, NavLink } from './styled';

class Navbar extends Component {
  state = { open: false };

  getClassName = () => (this.state.open ? `open` : ``);

  getPose = () => (this.state.open ? `open` : `closed`);

  toggleNavbar = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  renderMenu() {
    return (
      <Menu pose={this.getPose()} initialPose="closed">
        <MenuItem>
          <NavLink to="/about">About</NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/products">Products</NavLink>
        </MenuItem>
      </Menu>
    );
  }

  render() {
    const { open } = this.state;
    const Icon = open ? CloseIcon : MenuIcon;
    const className = this.getClassName();

    return (
      <Nav className={className}>
        <div>
          <Link to="/">
            <h1>
              <Logo
                className={className}
                src={logo}
                alt="White Market Podcast"
              />
            </h1>
          </Link>
        </div>
        <Button type="button" onClick={this.toggleNavbar}>
          <Icon className={className} size={35} />
        </Button>
        {this.renderMenu()}
      </Nav>
    );
  }
}

export default Navbar;
