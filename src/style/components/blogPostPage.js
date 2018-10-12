import styled from 'styled-components';
import posed from 'react-pose';
import Link from 'components/Link';
import {
  MOBILE_NAV_HEIGHT,
  DESKTOP_NAV_HEIGHT,
} from 'components/Navbar/constants';
import { white, black, lightEmerald, darkGrey } from '../colors';
import { onMobile } from '../mediaQueries';

function getImageURL(image) {
  return image.replace('/upload/', `/upload/c_scale,w_${1100}/`);
}

export const Title = styled.h1`
  color: ${white};
  max-width: 26ch;
  margin: 0 auto 0.5rem auto;
  text-align: center;
`;

export const Hero = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: ${black};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ),
    url(${({ src }) => src});
  min-height: 60vh;

  ${onMobile} {
    padding: 1rem;
  }
`;

export const Date = styled.div`
  color: ${white};
  font-weight: 600;
  margin-top: 0.5rem;
`;

export const CoverImage = styled.img`
  object-fit: cover;
`;

export const Column = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(min-content, 250px);

  &.no-aside {
    grid-template-columns: 1fr;
  }

  ${onMobile} {
    grid-template-columns: 1fr;
  }
`;

export const BlogContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1.5rem 1rem;

  ${onMobile} {
    padding: 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-align: center;
  }

  p,
  small,
  ul,
  li {
    margin-left: auto;
    margin-right: auto;
  }

  ul,
  li {
    max-width: 45ch;
  }

  p,
  small {
    max-width: 50ch;
  }

  img {
    display: flex;
    margin: 1rem auto;
    max-width: 100%;
  }
`;

export const Sidebar = styled.aside`
  padding: 2rem 1rem;
  background-color: ${lightEmerald};

  h4 {
    color: ${white};
    margin: 0.5rem 0;
  }

  ${onMobile} {
    padding: 1rem;
  }
`;

export const TagList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding: 0;

  li {
    display: flex;
  }
`;

export const BlogPostLink = styled(Link)`
  display: flex;
  color: ${white};
  line-height: 1.3;
  margin: 0;
  margin-bottom: 1rem;
  padding-left: 0.8rem;
`;

export const TagLink = styled(Link)`
  background-color: ${lightEmerald};
  border: 1px solid ${white};
  color: ${white};
  font-size: 0.8em;
  font-weight: 600;
  margin: 0 0.4rem 0.4rem 0;
  padding: 0.3rem 0.8rem;

  &:hover {
    filter: brightness(110%);
  }
`;

const audioDiv = posed.div({
  enter: { y: 0, transition: { ease: 'easeInOut' }, opacity: 1 },
  exit: { y: `100%`, opacity: 0 },
});

export const AudioPlyrContainer = styled(audioDiv)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
`;

export const VideoPlyrContainer = styled.div`
  background-color: ${darkGrey};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ),
    url(${({ bgImage }) => bgImage && getImageURL(bgImage)});

  > div {
    margin: 0 auto;
    max-width: calc((100vh - ${DESKTOP_NAV_HEIGHT}) / 9 * 16);
  }

  ${onMobile} {
    > div {
      max-width: calc((100vh - ${MOBILE_NAV_HEIGHT}) / 9 * 16);
    }
  }
`;
