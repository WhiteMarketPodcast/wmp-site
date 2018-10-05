import React, { Component } from 'react';
import Link from 'components/Link';
import { CloseIcon, MenuIcon } from 'mdi-react';
import logo from 'img/White-market-transp-logo.png';
import { Button, Logo, Menu, MenuItem, Nav, NavLink } from './styled';

class Navbar extends Component {
  state = { open: false, position: 0, hideNav: false, interval: null };

  componentDidMount() {
    this.setState({ interval: setInterval(this.listenForScroll, 500) });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  getClassName = () => (this.state.open ? `open` : ``);

  getNavPose = () => {
    const { hideNav, open } = this.state;
    return hideNav && !open ? `hide` : `show`;
  };

  getPose = () => (this.state.open ? `open` : `closed`);

  listenForScroll = () => {
    const { position, hideNav } = this.state;
    const newPosition = window.scrollY;
    if (newPosition === position) return;
    const isNearTheTop = newPosition <= 80;

    const stateChange = { position: newPosition };

    if (!isNearTheTop && position < newPosition && !hideNav) {
      stateChange.hideNav = true;
    } else if (hideNav && (isNearTheTop || position > newPosition)) {
      stateChange.hideNav = false;
    }

    this.setState(stateChange);
  };

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
          <NavLink to="/blog">Blog posts</NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/tags">Tags</NavLink>
        </MenuItem>
      </Menu>
    );
  }

  render() {
    const { open } = this.state;
    const Icon = open ? CloseIcon : MenuIcon;
    const className = this.getClassName();

    return (
      <Nav className={className} pose={this.getNavPose()} initialPose="show">
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
