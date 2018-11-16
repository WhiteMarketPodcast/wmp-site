import React, { Component } from 'react';
import { bool, func, string } from 'prop-types';
import { PlayIcon, PauseIcon } from 'mdi-react';
import { SrText } from 'style/components';
import { Button } from './styled';

class PlayButton extends Component {
  static propTypes = {
    isPlaying: bool,
    screenReaderText: string.isRequired,
    onClick: func.isRequired,
  };

  static defaultProps = {
    isPlaying: false,
  };

  render() {
    const { isPlaying, onClick, screenReaderText, ...rest } = this.props;
    const Icon = isPlaying ? PauseIcon : PlayIcon;

    return (
      <Button {...rest} onClick={onClick} type="button">
        <Icon size={35} />
        <SrText>{screenReaderText}</SrText>
      </Button>
    );
  }
}

export default PlayButton;
