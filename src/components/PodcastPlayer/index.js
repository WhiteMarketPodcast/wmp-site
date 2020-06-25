import _ from 'lodash'
import React, { PureComponent } from 'react'
import { object } from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import PauseIcon from 'mdi-react/PauseIcon'
import PlayIcon from 'mdi-react/PlayIcon'
import VolumeHighIcon from 'mdi-react/VolumeHighIcon'
import VolumeLowIcon from 'mdi-react/VolumeLowIcon'
import VolumeMediumIcon from 'mdi-react/VolumeMediumIcon'
import VolumeOffIcon from 'mdi-react/VolumeOffIcon'
import LoadingIcon from 'mdi-react/LoadingIcon'

import PodcastContext from 'contexts/PodcastContext'
import { SrOnly, SrText } from 'style/components'
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
} from './styled'
import { formatTime } from './utils'

class PodcastPlayer extends PureComponent {
  static contextType = PodcastContext

  static propTypes = {
    podcasts: object.isRequired,
  }

  state = {
    url: ``,
    title: ``,
    episodeImage: ``,
    volume: 1.0,
    muted: false,
    played: 0,
    episodes: _.map(this.props.podcasts.edges, `node.frontmatter`),
  }

  componentDidUpdate() {
    const { url } = this.context
    const { url: currentURL, changingURL } = this.state
    if (changingURL || currentURL === url) return
    console.log(`url change`)
    this.load(url)
  }

  getEpisode() {
    const { episodes } = this.state
    const { url } = this.context
    const episode = _.find(episodes, [`podcastURL`, url])
    return episode || {}
  }

  getEpisodeImage = () => {
    const { image } = this.getEpisode()
    return _.get(image, 'childImageSharp.fixed.src')
  }

  getEpisodeTitle = () => {
    const { title = `` } = this.getEpisode()
    return title.replace(/^session /i, ``)
  }

  getVolumeIcon = () => {
    const { muted, volume } = this.state
    if (muted) return VolumeOffIcon
    if (volume <= 0.3) return VolumeLowIcon
    if (volume >= 0.7) return VolumeHighIcon
    return VolumeMediumIcon
  }

  load = (url) => {
    const { setPlaying, setBuffering } = this.context
    this.setState({
      url,
      played: 0,
      title: this.getEpisodeTitle(),
      episodeImage: this.getEpisodeImage(),
    })
    setPlaying(true)
    setBuffering(true)
  }

  playPause = () => {
    const { isPlaying, setPlaying } = this.context
    setPlaying(!isPlaying)
  }

  stop = () => {
    const { setPlaying } = this.context
    this.setState({ url: null })
    setPlaying(false)
  }

  setVolume = (e) => {
    this.setState({ volume: parseFloat(e.target.value) })
  }

  toggleMuted = () => {
    this.setState(({ muted }) => ({ muted: !muted }))
  }

  onReady = () => {
    this.setState({ changingURL: false })
  }

  onPlay = () => {
    console.log('onPlay')
    const { setBuffering } = this.context
    setBuffering(false)
  }

  onPause = () => {
    console.log('onPause')
    const { setPlaying } = this.context
    setPlaying(false)
  }

  onSeekMouseDown = () => {
    this.setState({ seeking: true })
  }

  onSeekChange = (e) => {
    this.setState({ played: parseFloat(e.target.value) })
  }

  onSeekMouseUp = (e) => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }

  onProgressMouseDown = () => {
    this.setState({ seeking: true })
  }

  onProgressMouseUp = (e) => {
    const played = (1 / window.innerWidth) * e.screenX

    this.setState({ seeking: false, played })
    this.player.seekTo(played)
  }

  onProgress = (state) => {
    // We only want to update time slider if we are not currently seeking
    if (this.state.seeking) return
    this.setState(state)
  }

  onEnded = () => {
    const { setPlaying } = this.context
    setPlaying(false)
  }

  onDuration = (duration) => {
    this.setState({ duration })
  }

  ref = (player) => {
    this.player = player
  }

  render() {
    const { isBuffering, isPlaying, setPodcastState } = this.context
    const {
      url,
      title,
      episodeImage,
      volume,
      muted,
      played,
      duration,
    } = this.state
    if (!url) return null
    const [PlayPauseIcon, srText] = isPlaying
      ? [PauseIcon, `Pause`]
      : [PlayIcon, `Play`]
    const VolumeIcon = this.getVolumeIcon()
    const muteText = muted ? `Unmute` : `Mute`

    return (
      <AudioPlayerContainer pose="enter" initialPose="exit">
        <ReactPlayer
          ref={this.ref}
          url={url}
          playing={isPlaying}
          volume={volume}
          muted={muted}
          onReady={this.onReady}
          onPlay={this.onPlay}
          onPause={this.onPause}
          onEnded={this.onEnded}
          onProgress={this.onProgress}
          onDuration={this.onDuration}
          onBuffer={() => setPodcastState({ isBuffering: true })}
          onBufferEnd={() => {
            setPodcastState({ isPlaying: true, isBuffering: false })
          }}
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
          <PodcastArtwork src={episodeImage} />

          <PodcastInfoContainer>
            <PodcastTitle>{title}</PodcastTitle>
            <TimeRemaining>
              {!isBuffering && formatTime(duration * (1 - played), `-`)}
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
              disabled={isBuffering}
            >
              {isBuffering ? (
                <LoadingIcon className="spin" />
              ) : (
                <PlayPauseIcon />
              )}
              <SrText>{srText}</SrText>
            </PlayButton>
          </PlayButtonsContainer>
        </ControlsContainer>
      </AudioPlayerContainer>
    )
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
            image {
              childImageSharp {
                fixed(width: 110) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            podcastURL
            title
          }
        }
      }
    }
  }
`

export default () => (
  <StaticQuery
    query={query}
    render={({ podcasts }) => <PodcastPlayer podcasts={podcasts} />}
  />
)
