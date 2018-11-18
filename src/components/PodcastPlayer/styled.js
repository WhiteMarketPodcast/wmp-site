import styled from 'styled-components';
import posed from 'react-pose';

const audioDiv = posed.div({
  enter: { y: 0, transition: { ease: 'easeInOut' }, opacity: 1 },
  exit: { y: `100%`, opacity: 0 },
});

export const AudioPlayerContainer = styled(audioDiv)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
`;

export const Button = styled.button`
  height: 50px;
  width: 50px;
`;

export const PodcastArtwork = styled.div``;
export const PlayButtonsContainer = styled.div``;
export const PodcastInfoContainer = styled.div``;
export const PodcastTitle = styled.div``;
export const ProgressContainer = styled.div``;
export const VolumeContainer = styled.div``;
