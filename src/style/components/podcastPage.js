import styled from 'styled-components';
import { getImageURL } from 'utils/images';
import { FlexCenterColumn, BrandH1 } from 'style/components';
import {
  primary,
  primaryLight,
  black,
  offWhite,
  lightGrey,
  white,
} from 'style/colors';
import { onMobile } from 'style/mediaQueries';

export const TitleBG = styled(FlexCenterColumn)`
  background-color: ${black};
  background-image:
    linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
    url("${({ image }) => getImageURL({ image })}");
  background-position: center;
  background-size: cover;
  text-align: center;
  width: 100%;

  ${onMobile} {
    background-image:
      linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
      url("${({ image }) => getImageURL({ image, width: 600 })}");
  }
`;

export const TitleContainer = styled(FlexCenterColumn)`
  min-height: 25vh;
  padding: 5rem 1rem 2rem 1rem;

  ${onMobile} {
    padding: 3rem 1rem 1rem 1rem;
  }
`;

export const Title = styled(BrandH1)`
  color: ${white};
  margin: 0 auto;
`;

export const Grid = styled.div`
  padding: 3rem 0;
  display: flex;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;

  ${onMobile} {
    flex-direction: column;
    padding: 1.5rem 0;
  }
`;

export const EpisodesColumn = styled.div`
  border: 1px solid ${lightGrey};
  border-right: 0;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 1px;
  background-color: ${lightGrey};
  overflow-y: auto;
  flex: 1;

  ${onMobile} {
    margin: 0 1rem;
    max-height: 250px;
  }
`;

export const EpisodeTab = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  padding: 0.8rem;

  ${({ selected }) => {
    if (selected) {
      return `
        background-color: ${white};
        border-right: 1px solid ${white};
        border-left: 0;

        ::before {
          position: absolute;
          top: 0;
          left: 0;
          background: linear-gradient(35deg, ${primaryLight}, ${primary});
          height: 100%;
          content: '';
          width: 10px;
        }
      `;
    }

    return `
    background-color: ${offWhite};
    border-right: 1px solid ${lightGrey};
    border-left: 10px solid ${lightGrey};
  `;
  }};
`;

export const TabButton = styled.button`
  background: transparent;
  border: 0;
  border-radius: 0;
  font-family: 'Montserrat' !important;
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 1.3;
  padding: 0;
  text-align: left;
  transition: color 0.2s ease;

  &:hover,
  &:focus {
    color: ${primary};
  }

  ${({ selected }) => (selected ? `border-left: 10px solid transparent;` : ``)};
`;

export const CurrentEpisodeContainer = styled.div`
  flex: 2;
  border: 1px solid ${lightGrey};
  border-left: 0;
  padding: 2rem;

  ${onMobile} {
    border: 0;
    padding: 2rem 1rem;
  }
`;

export const SelectedEpsiodeTitle = styled.h2`
  margin-top: 0;
`;

export const PlayButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: 0;
  color: ${black};
  margin-left: 0.5rem;
  padding: 0;
  height: 35px;
  width: 35px;
  transition: all 0.2s ease;

  &:hover,
  &:focus {
    color: ${primary};
  }
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${primary};
  margin-left: 0.5rem;
  height: 35px;
  width: 35px;
`;
