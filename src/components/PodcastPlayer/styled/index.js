import Player from 'react-player'
import posed from 'react-pose'
import styled from 'styled-components'

import { black, hexToRGBA, primary, white } from 'style/colors'
import { onMobile } from 'style/mediaQueries'

import { tinyWMPLogo } from '../utils'

export const ReactPlayer = styled(Player)`
  position: absolute;
  z-index: -1;
`

const audioDiv = posed.div({
  enter: { y: 0, transition: { ease: 'easeInOut' } },
  exit: { y: `100%` },
})

export const AudioPlayerContainer = styled(audioDiv)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  background-color: ${white};
`

const Flex = styled.div`
  display: flex;
`

export const ControlsContainer = styled(Flex)`
  align-items: center;
  padding: 5px;
`

export const PodcastArtwork = styled.div`
  width: 50px;
  height: 50px;
  background-image: url(${({ src }) => src || tinyWMPLogo});
  background-color: ${black};
  background-position: center;
  background-size: cover;
  flex: 0 0 auto;
`
export const PlayButtonsContainer = styled(Flex)`
  background-color: rebeccapurple;
`
export const PodcastInfoContainer = styled(Flex)`
  flex: 1 1 auto;
  align-items: center;
`

export const PodcastTitle = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.2;
  max-height: 1.8rem;
  overflow: hidden;
  padding-left: 0.5rem;
  width: 100%;

  ${onMobile} {
    letter-spacing: -0.5px;
  }
`

export const TimeRemaining = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.7rem;
  font-weight: 500;
  line-height: 1.2;
  padding-right: 0.5rem;
  width: 8ch;
`

export const ProgressBG = styled.div`
  width: 100%;
  background-color: ${hexToRGBA(primary, 0.3)};
  cursor: pointer;
`

export const ProgressBar = styled.div`
  cursor: pointer;
  background-color: ${primary};
  height: 6px;
`

export const VolumeContainer = styled(Flex)`
  align-items: center;
  margin-right: 0.5rem;

  ${onMobile} {
    display: none;
  }
`

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
  border: 0;
  border-radius: 0;
  background-color: ${white};
  color: ${primary};
  height: 50px;
  width: 50px;
  padding: 0;
  transition: all 0.2s ease;

  &:hover,
  &:focus {
    background-color: ${primary};
    color: ${white};
  }
`

export const PlayButton = styled(Button)`
  border: 1px solid ${hexToRGBA(primary, 0.3)};
`

export * from './inputRange'
