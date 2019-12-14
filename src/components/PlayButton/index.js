import React, { Component } from 'react';
import { bool, func, string } from 'prop-types';
import PlayIcon from 'mdi-react/PlayIcon';
import PauseIcon from 'mdi-react/PauseIcon';
import LoadingIcon from 'mdi-react/LoadingIcon';
import { SrText } from 'style/components';
import { Button } from './styled';

class PlayButton extends Component {
  static propTypes = {
    isBuffering: bool.isRequired,
    isPlaying: bool.isRequired,
    screenReaderText: string.isRequired,
    onClick: func.isRequired,
  };

  render() {
    const {
      isBuffering,
      isPlaying,
      onClick,
      screenReaderText,
      ...rest
    } = this.props;
    let Icon = isPlaying ? PauseIcon : PlayIcon;
    if (isBuffering) Icon = LoadingIcon;

    return (
      <Button {...rest} onClick={onClick} type="button">
        <Icon size={35} className={isBuffering ? 'spin' : ''} />
        <SrText>{screenReaderText}</SrText>
      </Button>
    );
  }
}

export default PlayButton;
