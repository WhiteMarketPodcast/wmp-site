import InfiniteScroll from 'react-infinite-scroller'
import styled from 'styled-components'

import Link from 'components/Link'
import {
  black,
  primary,
  seeThruPrimary,
  seeThruPrimaryDark,
  white,
} from 'style/colors'
import { onDesktop, onMobile } from 'style/mediaQueries'

import PreviewCompatibleImage from '../PreviewCompatibleImage'

export const BlogListGrid = styled(InfiniteScroll)`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  grid-auto-flow: dense;
  grid-gap: 5px;
  justify-content: center;
  color: ${white};
  margin: 0 auto;
  padding-bottom: 2rem;
  max-width: 1500px;

  ${onDesktop} {
    grid-template-columns: repeat(auto-fit, 18rem);
    grid-auto-rows: 16rem;
  }
`

export const BlogPreviewContainer = styled(Link)`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  overflow: hidden;

  &:hover {
    filter: inherit;
  }

  ${onMobile} {
    align-items: flex-start;
    margin: 0.5rem 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    @supports (display: grid) {
      & {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: minmax(180px, min-content) auto;
        grid-template-areas: '. .' 'excerpt excerpt';
        grid-auto-flow: dense;
      }
    }
  }
`

export const BlogPreviewImage = styled(PreviewCompatibleImage)`
  background-color: ${primary};
  width: 100%;

  ${onMobile} {
    height: 100%;
    grid-column: 1 / 3;
    grid-row: 1;
  }

  ${onDesktop} {
    position: absolute !important;
    top: 0;
    bottom: 0;
    left: 0;
  }
`

export const PreviewTextContainer = styled.div`
  position: relative;
  width: 100%;
  background-color: ${seeThruPrimary};
  background-color: ${seeThruPrimaryDark};
  padding: 1rem 1.5rem;

  ${onMobile} {
    padding: 1rem 1rem 0.5rem 1rem;
    grid-column: 1 / 3;
    grid-row: 1;
    align-self: end;
  }
`

export const PostType = styled.div`
  position: absolute;
  top: -0.7em;
  left: 1em;
  display: inline;
  background-color: ${primary};
  box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.15);
  color: ${white};
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 1px;
  line-height: 1;
  padding: 0.2rem 0.5rem;
  text-transform: uppercase;
`

export const PreviewTitle = styled.h2`
  font-size: 1.2rem;
  margin: 0;

  &,
  a {
    color: ${white};
  }
`

export const ExcerptContainer = styled.div`
  grid-area: excerpt;
  font-size: 0.8rem;
  font-weight: 500;

  ${onMobile} {
    background-color: ${white};
    color: ${black};
    padding: 0.8rem 1rem;
  }

  ${onDesktop} {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${primary};
    color: ${white};
    line-height: 1.5;
    overflow-y: auto;
    padding: 0.8rem;
    transform: translateY(100%);
    transition: all 0.2s ease;

    &.active {
      transform: translateY(0);
    }
  }
`

export const DateText = styled.div`
  color: ${white};
  font-size: 0.75rem;
  font-weight: 600;
  text-align: right;

  @media (min-width: 576px) {
    margin-top: 0.5rem;
  }
`
