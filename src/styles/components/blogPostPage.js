import styled from 'styled-components';
import { white, black, emerald } from '../colors';
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
`;

export const CoverImage = styled.img`
  object-fit: cover;
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

export const TagContainer = styled.div`
  padding: 2rem 1rem;

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

  a {
    border: 1px solid ${emerald};
    margin: 0 0.5rem 0.5rem 0;
    padding: 0.5rem 1rem;
  }
`;
