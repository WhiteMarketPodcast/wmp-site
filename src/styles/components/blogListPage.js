import styled from 'styled-components';
import Link from 'components/Link';
import InfiniteScroll from 'react-infinite-scroller';
import { black, emerald, translucentEmerald, white } from '../colors';
import { onMobile } from '../mediaQueries';

function getImageURL(image, index, isSmall = false) {
  if (!/res.cloudinary.com/.test(image)) return image;
  const width = isSmall ? 450 : 700;
  return image.replace('/upload/', `/upload/c_scale,w_${width}/`);
}

export const BlogListGrid = styled(InfiniteScroll)`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  grid-gap: 5px;
  min-height: calc(100vh - 180px);
  max-width: 1500px;
  margin: 0 auto;
  padding-bottom: 2rem;
  color: ${white};
  grid-auto-flow: dense;

  @media (min-width: 576px) {
    padding: 30px 10px;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 250px;
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 300px;
  }
`;

export const BlogPreviewContainer = styled(Link)`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  overflow: hidden;

  &:hover {
    filter: inherit;
  }

  @media (max-width: 575px) {
    align-items: flex-start;
    margin: 0.5rem 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    @supports (display: grid) {
      & {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: minmax(150px, min-content) auto;
        grid-template-areas: '. .' 'excerpt excerpt';
        grid-auto-flow: dense;
      }
    }
  }
`;

export const BlogPreviewImage = styled.div`
  background-color: ${emerald};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.25),
      rgba(0, 0, 0, 0.25)
    ),
    url(${({ bgImage, index }) => getImageURL(bgImage, index)});
  width: 100%;

  @media (max-width: 575px) {
    background-image: url(${({ bgImage, index }) => getImageURL(bgImage, index, true)});
    height: 100%;
    grid-column: 1 / 3;
    grid-row: 1;
  }

  @media (min-width: 576px) {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
  }
`;

export const PreviewTextContainer = styled.div`
  position: relative;
  width: 100%;
  background-color: ${translucentEmerald};
  padding: 1rem 1.5rem;

  ${onMobile} {
    padding: 1rem;
  }

  @media (max-width: 575px) {
    padding: 1rem 1rem 0.5rem 1rem;
    grid-column: 1 / 3;
    grid-row: 1;
    align-self: end;
  }
`;

export const BlogType = styled.div`
  position: absolute;
  top: -0.7em;
  left: 1em;
  display: inline;
  background-color: ${emerald};
  color: ${white};
  font-size: 0.75rem;
  letter-spacing: 1px;
  line-height: 1;
  padding: 0.2rem 0.5rem;
  text-transform: uppercase;
`;

export const PreviewTitle = styled.h2`
  font-size: 1.2rem;
  margin: 0;

  &,
  a {
    color: ${white};
  }
`;

export const ExcerptContainer = styled.div`
  grid-area: excerpt;

  @media (max-width: 575px) {
    background-color: ${white};
    color: ${black};
    font-size: 0.8rem;
    padding: 0.8rem 1rem;
  }

  @media (min-width: 576px) {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${emerald};
    color: ${white};
    font-size: 0.7rem;
    line-height: 1.5;
    overflow-y: scroll;
    padding: 0.5rem 0.5rem 1rem 0.5rem;
    transform: translateY(100%);
    transition: all 0.2s ease;

    &.active {
      transform: translateY(0);
    }
  }
`;

export const DateText = styled.div`
  color: ${white};
  font-size: 0.75rem;
  font-weight: 600;
  text-align: right;

  @media (min-width: 576px) {
    margin-top: 0.5rem;
  }
`;
