import _ from 'lodash'
import styled from 'styled-components'

import Link from 'components/Link'

import {
  black,
  primary,
  seeThruPrimaryDark,
  seeThruWhite,
  white,
} from '../colors'
import { sansSerif } from '../fonts'
import { onMobile } from '../mediaQueries'

const isHighlightedPreview = (index: number) => _.includes([0, 3, 5], index)

export const BlogPostPreviewGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: minmax(180px, min-content);
  grid-gap: 1rem;
  max-width: 1500px;
  margin: 0 auto 2rem auto;
  color: ${white};
  grid-auto-flow: dense;
  grid-template-areas:
    'main'
    'small1'
    'small2'
    'big1'
    'small3'
    'small4'
    'big2'
    'small5';

  > a::before {
    opacity: 0;
  }

  @media (min-width: 576px) {
    grid-gap: 5px;
    margin: 0 auto;
    padding: 0 10px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 40px repeat(4, 250px);
    grid-template-areas:
      'main    main    .     '
      'main    main    small1'
      'small2  big1    big1  '
      'big2    big2    small3'
      'small4  small5  .     ';

    > a::before {
      opacity: 1;
    }
  }

  @media (min-width: 576px) and (max-width: 991px) {
    a:nth-child(8)::before {
      border: 0 solid transparent;
      border-right-color: ${white};
      border-width: 15px 15px 0 0;
      content: '';
      position: absolute;
      right: 0;
      bottom: 0;
      z-index: 5;
    }
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 40px repeat(3, 35vh) 15px;
    grid-template-areas:
      'main    main  main    .     '
      'main    main  main    small1'
      'small2  big1  big1    small3'
      'big2    big2  small4  small5'
      '.       .     small4  small5';

    a:nth-child(7)::before {
      border: 0 solid transparent;
      border-left-color: ${white};
      border-width: 20px 0 0 20px;
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 5;
    }
  }

  > a:first-child {
    grid-area: main;

    &::before {
      border: 0 solid transparent;
      border-right-color: ${white};
      border-width: 0 45px 45px 0;
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      z-index: 5;
    }
  }

  > a:nth-child(2) {
    grid-area: small1;
  }
  > a:nth-child(3) {
    grid-area: small2;
  }
  > a:nth-child(4) {
    grid-area: big1;
  }
  > a:nth-child(5) {
    grid-area: small3;
  }
  > a:nth-child(6) {
    grid-area: big2;
  }
  > a:nth-child(7) {
    grid-area: small4;
  }
  > a:nth-child(8) {
    grid-area: small5;
  }
`

export const BlogPreviewContainer = styled(Link)`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  &:hover {
    filter: inherit;
  }

  @media (max-width: 575px) {
    align-items: flex-start;
  }
`

export const BlogPreviewImage = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: ${primary};
  width: 100%;

  @media (max-width: 575px) {
    width: 40%;
  }
`

export const PreviewTextContainer = styled.div<{ index: number }>`
  position: relative;
  width: 100%;

  ${({ index }) => {
    const [bgColor, n] = isHighlightedPreview(index)
      ? [seeThruPrimaryDark, `1.5`]
      : [seeThruWhite, `1`]
    return `
      background-color: ${bgColor};
      padding: ${n}rem;
    `
  }};

  @media (max-width: 575px) {
    align-self: center;
    background-color: ${white};
    margin-left: 40%;
    padding: 0 1rem;
  }
`

export const PostType = styled.div`
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

  @media (min-width: 576px) {
    position: absolute;
    top: -0.7em;
    left: 1em;
  }
`

export const PreviewTitle = styled.h3<{ index: number }>`
  font-size: ${({ index }) => (isHighlightedPreview(index) ? `1.5` : `1.2`)}rem;
  margin: 0;

  &,
  a {
    color: ${({ index }) => (isHighlightedPreview(index) ? white : black)};
    @media (max-width: 575px) {
      color: ${black};
      font-size: 1.2rem;
    }
  }
`

export const DateText = styled.div<{ index: number }>`
  color: ${black};
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1;
  margin-top: 0.5rem;
  text-align: right;

  @media (min-width: 576px) {
    color: ${({ index }) => (isHighlightedPreview(index) ? white : black)};
  }
`

const linearGradient = `linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.4))`
export const PodcastSection = styled.section`
  position: relative;
  background-color: ${primary};
`

export const PodcastSectionContents = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: ${linearGradient};
  min-height: 50vh;
  width: 100%;

  @media (max-width: 575px) {
    min-height: 500px;
  }
`

export const PodcastPlayBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
  padding: 3rem 1rem 1rem 1rem;
`

export const PodcastTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem 0;

  ${onMobile} {
    padding-bottom: 0;
  }
`

export const PodcastSmallText = styled.h2`
  background-color: ${primary};
  color: ${white};
  font-family: ${sansSerif};
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 1px;
  line-height: 1;
  margin-bottom: 0.2rem;
  padding: 0.3rem 0.5rem;
  text-transform: uppercase;

  ${onMobile} {
    font-size: 0.75rem;
  }
`

export const PodcastTitle = styled.h3`
  color: ${white};
  max-width: 50ch;
  margin: 0 auto;
`

export const PlyrContainer = styled.div`
  width: 50ch;
  max-width: 100%;
`

export const SeeMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.5rem 1rem;
  padding: 2rem 0;

  ${onMobile} {
    padding: 1.5rem 0;
  }
`
