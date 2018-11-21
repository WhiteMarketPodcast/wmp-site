import styled from 'styled-components';
import posed from 'react-pose';
import Link from 'components/Link';
import {
  MOBILE_NAV_HEIGHT,
  DESKTOP_NAV_HEIGHT,
} from 'components/Navbar/constants';
import { getImageURL } from 'utils/images';
import { white, black, primary, darkGrey, grey } from '../colors';
import { onMobile, onMassiveScreen } from '../mediaQueries';
import { fade, slideUpWithDelay } from '../poses';

export const Title = styled.h1`
  color: ${white};
  max-width: 26ch;
  margin: 0 auto 1rem auto;
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
    url(${({ src }) => getImageURL({ image: src })});
  min-height: 60vh;

  ${onMobile} {
    background-image: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.4),
        rgba(0, 0, 0, 0.4)
      ),
      url(${({ src }) => getImageURL({ image: src, width: 700 })});
    padding: 1rem;
  }

  ${onMassiveScreen} {
    background-image: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.4),
        rgba(0, 0, 0, 0.4)
      ),
      url(${({ src }) => getImageURL({ image: src, width: 1700 })});
  }
`;

export const Fade = posed.div(fade);
export const CenteredFade = styled(Fade)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  will-change: opacity;
`;

export const Date = styled.div`
  color: ${white};
  font-weight: 600;
  margin-top: 1rem;
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

const SlideUp = posed.div(slideUpWithDelay);
export const BlogContent = styled(SlideUp)`
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
  background-color: ${primary};

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
  margin: 1rem 0;
  padding: 0;

  li {
    display: flex;
  }
`;

export const BlogPostLinksContainer = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 1rem 0;
  padding: 0;
`;

export const BlogPostLink = styled(Link)`
  display: flex;
  color: ${white};
  font-size: 0.85rem;
  font-weight: 600;
  line-height: 1.3;
  margin: 0;
  margin-bottom: 0.5rem;
`;

export const TagLink = styled(Link)`
  background-color: ${primary};
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
    url(${({ bgImage }) => bgImage && getImageURL({ image: bgImage })});
  height: calc((100vw - 250px) / 16 * 9);
  max-height: calc(100vh - ${DESKTOP_NAV_HEIGHT});
  max-width: 100vw;

  > div {
    margin: 0 auto;
    max-width: calc((100vh - ${DESKTOP_NAV_HEIGHT}) / 9 * 16);
  }

  ${onMobile} {
    height: calc(100vw / 16 * 9);
    max-height: calc(100vh - ${MOBILE_NAV_HEIGHT});
    background-image: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.4),
        rgba(0, 0, 0, 0.4)
      ),
      url(${({ bgImage }) => bgImage && getImageURL({ image: bgImage, width: 700 })});

    > div {
      max-width: calc((100vh - ${MOBILE_NAV_HEIGHT}) / 9 * 16);
    }
  }
`;

export const ShareLinksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem 0 1.4rem 0;
`;

export const ShareLink = styled(Link)`
  display: inline-block;
  color: ${white};
  font-size: 1.25rem;
  line-height: 1;
  margin-right: 0.8rem;
  opacity: 0.9;

  &:hover {
    filter: unset;
    opacity: 1;
  }
`;

export const ImageCredit = styled.div`
  border-bottom: 1px solid ${grey};
  color: ${darkGrey};
  font-size: 0.8rem;
  font-style: italic;
  margin: 0 1rem;
  margin-top: 0.3rem;
`;
