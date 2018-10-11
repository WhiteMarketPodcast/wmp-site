import React, { Component } from 'react';
import { bool, func } from 'prop-types';
import { PlayIcon, PauseIcon } from 'mdi-react';
import { Button } from './styled';

class PlayButton extends Component {
  static propTypes = {
    isPlaying: bool,
    onClick: func.isRequired,
  };

  static defaultProps = {
    isPlaying: false,
  };

  render() {
    const { isPlaying, onClick, ...rest } = this.props;
    const Icon = isPlaying ? PauseIcon : PlayIcon;

    return (
      <Button {...rest} onClick={onClick} type="button">
        <Icon size={35} />
      </Button>
    );
  }
}

export default PlayButton;
