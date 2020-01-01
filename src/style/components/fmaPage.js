import styled from 'styled-components'
import Link from 'components/Link'
import InfiniteScroll from 'react-infinite-scroller'
import { primary, white } from 'style/colors'
import { onMobile, onDesktop } from 'style/mediaQueries'

export const Grid = styled(InfiniteScroll)`
  display: grid;
  grid-template-columns: 80vw;
  grid-auto-rows: 80vw;
  grid-auto-flow: dense;
  justify-content: center;
  color: ${white};
  margin: 0 auto;
  padding-bottom: 2rem;
  max-width: 1500px;

  ${onDesktop} {
    grid-template-columns: repeat(auto-fit, 18rem);
    grid-auto-rows: 18rem;
  }
`

export const AlbumContainer = styled(Link)`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  background-color: ${primary};
  overflow: hidden;
  opacity: 0.8;

  &:hover {
    filter: inherit;
    opacity: 1;
  }

  ${onMobile} {
    opacity: 1;
    font-weight: 600;
  }
`

export const InfoContainer = styled.div`
  grid-area: excerpt;
  font-size: 0.8rem;

  ${onMobile} {
    background-color: rgba(0, 0, 0, 0.6);
    color: ${white};
    padding: 0.8rem 1rem;
    width: 100%;
  }

  ${onDesktop} {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${primary};
    color: ${white};
    line-height: 1.5;
    overflow-y: auto;
    padding: 0.8rem;
    transition: all 0.2s ease;
    transform: translateY(${({ active }) => (active ? 0 : 100)}%);
  }
`

export const ArtistAndTitle = styled.div`
  font-weight: 600;
`
