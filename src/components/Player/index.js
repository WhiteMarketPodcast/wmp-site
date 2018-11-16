import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { string, bool } from 'prop-types';

class Player extends Component {
  static propTypes = {
    url: string.isRequired,
    type: string,
    autoplay: bool,
  };

  static defaultProps = { autoplay: false, type: `audio` };

  getType = () => {
    const { type, url } = this.props;
    const isVideo = type === `video`;

    if (isVideo) {
      if (/youtu\.?be/.test(url)) return `youtube`;
      if (/vimeo\./.test(url)) return `vimeo`;
    }

    return type;
  };

  render() {
    const { url, ...rest } = this.props;

    return <ReactPlayer {...rest} type={this.getType()} url={url} controls />;
  }
}

export default Player;
