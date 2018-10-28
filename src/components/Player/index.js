import React, { Component } from 'react';
import Plyr from 'react-plyr';
import { string, bool } from 'prop-types';
import 'style/sass/plyr/plyr.scss';

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
    const { url, autoplay, ...rest } = this.props;

    return (
      <Plyr
        {...rest}
        autoplay={autoplay}
        loadSprite={false}
        storage={{ enabled: false }}
        type={this.getType()}
        url={url}
        videoId={url}
      />
    );
  }
}

export default Player;
