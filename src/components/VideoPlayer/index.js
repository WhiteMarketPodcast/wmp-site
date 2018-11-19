import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import PodcastContext from 'components/PodcastContext';

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

  render() {
    console.log('this.context', this.context);
    const { isPlaying } = this.context;
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
    console.log('url', url);

    return (
      <div
        style={{ backgroundColor: `white`, overflow: `auto`, maxHeight: 300 }}
      >
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

        <div style={{ backgronudColor: `white` }}>
          <button type="button" onClick={this.stop}>
            Stop
          </button>
          <button
            id="podcast-play-button"
            type="button"
            onClick={this.playPause}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>

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
        <div>
          <strong>Volume</strong>
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
        </div>
        <div>
          <strong>
            <label htmlFor="muted">
              Muted
              <input
                id="muted"
                type="checkbox"
                checked={muted}
                onChange={this.toggleMuted}
              />
            </label>
          </strong>
        </div>
        <div>
          <strong>
            <label htmlFor="loop">
              Loop
              <input
                id="loop"
                type="checkbox"
                checked={loop}
                onChange={this.toggleLoop}
              />
            </label>
          </strong>
        </div>
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

        <div>
          <strong>url</strong>
          <div className={!url ? 'faded' : ''}>
            {(url instanceof Array ? 'Multiple' : url) || 'null'}
          </div>
        </div>
        <div>
          <strong>playing</strong>
          <div>{isPlaying ? 'true' : 'false'}</div>
        </div>
        <div>
          <strong>volume</strong>
          <div>{volume.toFixed(3)}</div>
        </div>
        <div>
          <strong>played</strong>
          <div>{played.toFixed(3)}</div>
        </div>
        <div>
          <strong>loaded</strong>
          <div>{loaded.toFixed(3)}</div>
        </div>
        <div>
          <strong>duration</strong>
          <div>
            <span>{duration}</span>
          </div>
        </div>
        <div>
          <strong>elapsed</strong>
          <div>
            <span>{duration * played}</span>
          </div>
        </div>
        <div>
          <strong>remaining</strong>
          <div>
            <span>{duration * (1 - played)}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Player;
