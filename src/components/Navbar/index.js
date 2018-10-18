import React, { Component } from 'react';
import { string } from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { CloseIcon, MenuIcon } from 'mdi-react';
import logo from 'img/White-market-transp-logo.png';
import { Button, Logo, LogoLink, Menu, MenuItem, Nav, NavLink } from './styled';

class Navbar extends Component {
  static propTypes = {
    locationKey: string.isRequired,
  };

  state = {
    open: false,
    position: 0,
    hideNav: false,
    locationKey: this.props.locationKey, // eslint-disable-line
  };

  static getDerivedStateFromProps(props, state) {
    const { locationKey: newKey } = props;
    const { locationKey: oldKey, open } = state;
    const change = {};

    if (newKey !== oldKey) {
      change.locationKey = newKey;
      if (open) change.open = false;
    }

    return isEmpty(change) ? null : change;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.listenForScroll);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { open, hideNav } = this.state;

    return open !== nextState.open || hideNav !== nextState.hideNav;
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenForScroll);
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
        <LogoLink to="/">
          <h1>
            <Logo className={className} src={logo} alt="White Market Podcast" />
          </h1>
        </LogoLink>
        <Button type="button" onClick={this.toggleNavbar}>
          <Icon className={className} size={35} />
        </Button>
        {this.renderMenu()}
      </Nav>
    );
  }
}

export default Navbar;
