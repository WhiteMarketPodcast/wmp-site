import styled from 'styled-components';
import Link from 'components/Link';
import InfiniteScroll from 'react-infinite-scroller';
import { black, emerald, translucentEmerald, white } from '../colors';
import { onMobile, onDesktop } from '../mediaQueries';

function getImageURL(image) {
  if (!/res.cloudinary.com/.test(image)) return image;
  return image.replace('/upload/', `/upload/c_scale,w_600/`);
}

export const BlogListGrid = styled(InfiniteScroll)`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  grid-gap: 5px;
  justify-content: center;
  min-height: calc(100vh - 180px);
  margin: 0 auto;
  padding-bottom: 2rem;
  color: ${white};
  grid-auto-flow: dense;

  ${onDesktop} {
    grid-template-columns: repeat(auto-fill, 18rem);
    grid-auto-rows: 16rem;
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
`;

export const BlogPreviewImage = styled.div`
  background-color: ${emerald};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${({ bgImage }) => getImageURL(bgImage)});
  width: 100%;

  ${onMobile} {
    height: 100%;
    grid-column: 1 / 3;
    grid-row: 1;
  }

  ${onDesktop} {
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
    padding: 1rem 1rem 0.5rem 1rem;
    grid-column: 1 / 3;
    grid-row: 1;
    align-self: end;
  }
`;

export const PostType = styled.div`
  position: absolute;
  top: -0.7em;
  left: 1em;
  display: inline;
  background-color: ${emerald};
  box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.15);
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
  font-size: 0.8rem;

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
    background-color: ${emerald};
    color: ${white};
    line-height: 1.5;
    overflow-y: scroll;
    padding: 0.8rem;
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
