import _ from 'lodash';
import React, { Component } from 'react';
import { object } from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { PoseGroup } from 'react-pose';
import PodcastContext from 'components/PodcastContext';
import {
  PauseIcon,
  PlayIcon,
  VolumeHighIcon,
  VolumeLowIcon,
  VolumeMediumIcon,
  VolumeOffIcon,
} from 'mdi-react';
import { SrOnly, SrText } from 'style/components';
import {
  AudioPlayerContainer,
  Button,
  ControlsContainer,
  PodcastArtwork,
  PlayButton,
  PlayButtonsContainer,
  PodcastInfoContainer,
  PodcastTitle,
  ProgressBG,
  ProgressBar,
  ReactPlayer,
  TimeRemaining,
  VolumeContainer,
  VolumeSlider,
} from './styled';
import { formatTime } from './utils';

class PodcastPlayer extends Component {
  static contextType = PodcastContext;

  static propTypes = {
    podcasts: object.isRequired,
  };

  state = {
    url: this.context.url,
    volume: 1.0,
    muted: false,
    played: 0,
    // loaded: 0,
    // duration: 0,
    playbackRate: 1.0,
    loop: false,
  };

  componentDidUpdate() {
    const { url } = this.context;
    if (this.state.url === url) return;
    console.log(`url change`);
    this.load(url);
  }

  getPodcast() {
    const { edges } = this.props.podcasts;
    console.log('edges', edges);
    const { url } = this.context;
    const episode = _.find(
      edges,
      (edge) => edge.node.frontmatter.podcastURL === url,
    );
    if (!episode) return {};
    return episode.node.frontmatter;
  }

  getPodcastImage = () => {
    const { image = ``, imageURL = `` } = this.getPodcast();
    console.log('image = ``, imageURL', image, imageURL);
    return image || imageURL;
  };

  getPodcastTitle = () => this.getPodcast().title || ``;

  getVolumeIcon = () => {
    const { muted, volume } = this.state;
    if (muted) return VolumeOffIcon;
    if (volume <= 0.3) return VolumeLowIcon;
    if (volume >= 0.7) return VolumeHighIcon;
    return VolumeMediumIcon;
  };

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
    console.log(e);
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

  onProgressMouseDown = () => {
    this.setState({ seeking: true });
  };

  onProgressMouseUp = (e) => {
    const played = (1 / window.innerWidth) * e.screenX;

    this.setState({ seeking: false, played });
    this.player.seekTo(played);
  };

  onProgress = (state) => {
    console.log('onProgress', state);
    // We only want to update time slider if we are not currently seeking
    if (this.state.seeking) return;
    this.setState(state);
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
    const { isPlaying } = this.context;
    const {
      url,
      volume,
      muted,
      loop,
      played,
      duration,
      playbackRate,
    } = this.state;
    const [PlayPauseIcon, srText] = isPlaying
      ? [PauseIcon, `Pause`]
      : [PlayIcon, `Play`];
    const VolumeIcon = this.getVolumeIcon();
    const muteText = muted ? `Unmute` : `Mute`;

    return (
      <AudioPlayerContainer key="podcast-player">
        <ReactPlayer
          ref={this.ref}
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

        <SrOnly>
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={played}
            onMouseDown={this.onSeekMouseDown}
            onChange={this.onSeekChange}
            onMouseUp={this.onSeekMouseUp}
            aria-label="Seek"
          />
        </SrOnly>

        <ProgressBG
          onMouseDown={this.onProgressMouseDown}
          onMouseUp={this.onProgressMouseUp}
        >
          <ProgressBar style={{ width: `${played * 100}%` }} />
        </ProgressBG>

        <ControlsContainer>
          <PodcastArtwork src={this.getPodcastImage()} />

          <PodcastInfoContainer>
            <PodcastTitle>{this.getPodcastTitle()}</PodcastTitle>
            <TimeRemaining>
              {formatTime(duration * (1 - played), `-`)}
            </TimeRemaining>
          </PodcastInfoContainer>

          <VolumeContainer>
            <Button onClick={this.toggleMuted}>
              <VolumeIcon />
              <SrText>{muteText}</SrText>
            </Button>
            <VolumeSlider
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={volume}
              onChange={this.setVolume}
              volume={volume * 100}
            />
          </VolumeContainer>

          <PlayButtonsContainer>
            <PlayButton
              id="podcast-play-button"
              type="button"
              onClick={this.playPause}
            >
              <PlayPauseIcon />
              <SrText>{srText}</SrText>
            </PlayButton>
          </PlayButtonsContainer>
        </ControlsContainer>
      </AudioPlayerContainer>
    );
  }

  render() {
    const { url } = this.context;
    return <PoseGroup>{!!url && this.renderPlayer()}</PoseGroup>;
  }
}

const query = graphql`
  query PodcastPlayerQuery {
    podcasts: allMarkdownRemark(
      filter: { frontmatter: { format: { eq: "audio" } } }
    ) {
      edges {
        node {
          frontmatter {
            image
            imageURL
            podcastURL
            title
          }
        }
      }
    }
  }
`;

export default () => (
  <StaticQuery
    query={query}
    render={({ podcasts }) => <PodcastPlayer podcasts={podcasts} />}
  />
);
