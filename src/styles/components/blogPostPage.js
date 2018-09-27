import styled from 'styled-components';
import Link from 'components/Link';
import { white, black, lightEmerald } from '../colors';
import { onMobile } from '../mediaQueries';

export const Title = styled.h1`
  color: ${white};
  max-width: 26ch;
  margin: 0 auto;
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
      rgba(0, 0, 0, 0.35),
      rgba(0, 0, 0, 0.35)
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

export const BlogContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 1rem;

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
