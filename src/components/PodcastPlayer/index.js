import React, { Component } from 'react';
import { PoseGroup } from 'react-pose';
import Player from 'components/Player';
import PodcastContext from 'components/PodcastContext';
import { AudioPlyrContainer } from 'style/components';

class PodcastPlayer extends Component {
  static contextType = PodcastContext;

  render() {
    const { url, title, setPlayState } = this.context;
    return (
      <PoseGroup>
        {!!url && [
          <AudioPlyrContainer key="podcast-player">
            <Player
              url={url}
              title={title}
              onPlay={() => setPlayState(true)}
              onPause={() => setPlayState(false)}
              type="audio"
              autoplay
            />
          </AudioPlyrContainer>,
        ]}
      </PoseGroup>
    );
  }
}

export default PodcastPlayer;
