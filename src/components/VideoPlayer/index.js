import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { string } from 'prop-types';

class VideoPlayer extends Component {
  static propTypes = { url: string.isRequired };

  state = {
    url: this.props.url,
    volume: 0.8,
    muted: false,
    playbackRate: 1.0,
    loop: false,
    playing: true,
  };

  load = (url) => {
    this.setState({
      url,
      playing: true,
    });
  };

  playPause = () => this.setState(({ playing }) => ({ playing: !playing }));

  stop = () => {
    this.setState({ url: null });
    this.setState({ playing: false });
  };

  toggleLoop = () => {
    this.setState(({ loop }) => ({ loop: !loop }));
  };

  setVolume = (e) => {
    this.setState({ volume: parseFloat(e.target.value) });
  };

  toggleMuted = () => {
    this.setState(({ muted }) => ({ muted: !muted }));
  };

  setPlaybackRate = (e) => {
    this.setState({ playbackRate: parseFloat(e.target.value) });
  };

  onPlay = () => this.setState({ playing: true });

  onPause = () => this.setState({ playing: false });

  onProgress = (state) => {
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state);
    }
  };

  onEnded = () => this.setState(({ loop }) => ({ playing: loop }));

  ref = (player) => {
    this.player = player;
  };

  render() {
    const { url, volume, muted, loop, playbackRate, playing } = this.state;

    return (
      <ReactPlayer
        ref={this.ref}
        width="100%"
        height="100%"
        url={url}
        playing={playing}
        loop={loop}
        playbackRate={playbackRate}
        volume={volume}
        muted={muted}
        onReady={this.onPlay}
        onPlay={this.onPlay}
        onPause={this.onPause}
        onEnded={this.onEnded}
        controls
      />
    );
  }
}

export default VideoPlayer;
