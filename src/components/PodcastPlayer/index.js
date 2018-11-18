import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { PoseGroup } from 'react-pose';
import PodcastContext from 'components/PodcastContext';
import { StopIcon, PauseIcon, PlayIcon } from 'mdi-react';
import { SrText } from 'style/components';
import {
  AudioPlayerContainer,
  Button,
  PodcastArtwork,
  PlayButtonsContainer,
  PodcastInfoContainer,
  PodcastTitle,
  ProgressContainer,
  VolumeContainer,
} from './styled';

class Player extends Component {
  static contextType = PodcastContext;

  state = {
    url: this.context.url,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
  };

  componentDidUpdate() {
    const { url } = this.context;
    if (this.state.url === url) return;
    console.log(`url change`);
    this.load(url);
  }

  load = (url) => {
    const { setPlayState } = this.context;
    this.setState({ url, played: 0, loaded: 0 });
    setPlayState(true);
  };

  playPause = () => {
    const { isPlaying, setPlayState } = this.context;
    setPlayState(!isPlaying);
  };

  stop = () => {
    const { setPlayState } = this.context;
    this.setState({ url: null });
    setPlayState(false);
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

  onPlay = () => {
    console.log('onPlay');
    const { setPlayState } = this.context;
    setPlayState(true);
  };

  onPause = () => {
    console.log('onPause');
    const { setPlayState } = this.context;
    setPlayState(false);
  };

  onSeekMouseDown = () => {
    this.setState({ seeking: true });
  };

  onSeekChange = (e) => {
    this.setState({ played: parseFloat(e.target.value) });
  };

  onSeekMouseUp = (e) => {
    this.setState({ seeking: false });
    this.player.seekTo(parseFloat(e.target.value));
  };

  onProgress = (state) => {
    console.log('onProgress', state);
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state);
    }
  };

  onEnded = () => {
    console.log('onEnded');
    const { loop } = this.state;
    const { setPlayState } = this.context;
    setPlayState(loop);
  };

  onDuration = (duration) => {
    console.log('onDuration', duration);
    this.setState({ duration });
  };

  onClickFullscreen = () => {
    console.log('onClickFullscreen');
  };

  ref = (player) => {
    this.player = player;
  };

  renderPlayer() {
    console.log('this.context', this.context);
    const { isPlaying, title } = this.context;
    const {
      url,
      volume,
      muted,
      loop,
      played,
      loaded,
      duration,
      playbackRate,
    } = this.state;
    console.log({ duration, url });
    const [PlayPauseIcon, srText] = isPlaying
      ? [PauseIcon, `Pause`]
      : [PlayIcon, `Play`];

    return (
      <AudioPlayerContainer key="podcast-player">
        <ReactPlayer
          ref={this.ref}
          className="react-player"
          width="100%"
          height="100%"
          url={url}
          playing={isPlaying}
          loop={loop}
          playbackRate={playbackRate}
          volume={volume}
          muted={muted}
          onReady={this.onPlay}
          onStart={() => console.log('onStart')}
          onPlay={this.onPlay}
          onPause={this.onPause}
          onBuffer={() => console.log('onBuffer')}
          onSeek={(e) => console.log('onSeek', e)}
          onEnded={this.onEnded}
          onError={(e) => console.log('onError', e)}
          onProgress={this.onProgress}
          onDuration={this.onDuration}
        />

        <PodcastArtwork src={console.log(`src`) || ``} />

        <PlayButtonsContainer>
          <Button
            id="podcast-play-button"
            type="button"
            onClick={this.playPause}
          >
            <PlayPauseIcon />
            <SrText>{srText}</SrText>
          </Button>
          <Button type="button" onClick={this.stop}>
            <StopIcon />
          </Button>
        </PlayButtonsContainer>

        <PodcastInfoContainer>
          <PodcastTitle>{title}</PodcastTitle>
          <ProgressContainer>
            <div>
              <strong>Seek</strong>
              <div>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step="any"
                  value={played}
                  onMouseDown={this.onSeekMouseDown}
                  onChange={this.onSeekChange}
                  onMouseUp={this.onSeekMouseUp}
                />
              </div>
            </div>
          </ProgressContainer>
        </PodcastInfoContainer>

        <VolumeContainer>
          <strong>Volume</strong>
          <label htmlFor="muted">
            Muted
            <input
              id="muted"
              type="checkbox"
              checked={muted}
              onChange={this.toggleMuted}
            />
          </label>
          <div>
            <input
              type="range"
              min={0}
              max={1}
              step="any"
              value={volume}
              onChange={this.setVolume}
            />
          </div>
        </VolumeContainer>

        <div>
          <strong>Played</strong>
          <div>
            <progress max={1} value={played} />
          </div>
        </div>
        <div>
          <strong>Loaded</strong>
          <div>
            <progress max={1} value={loaded} />
          </div>
        </div>

        <h2>State</h2>
      </AudioPlayerContainer>
    );
  }

  render() {
    const { url } = this.context;
    return <PoseGroup>{!!url && this.renderPlayer()}</PoseGroup>;
  }
}

export default Player;
