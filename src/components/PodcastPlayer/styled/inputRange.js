import styled from 'styled-components';
import { white, primary, primaryDark, hexToRGBA } from 'style/colors';

export const VolumeSlider = styled.input`
  &[type='range'] {
    -webkit-appearance: none;
    height: 6px;
    margin-left: 0.5rem;
    width: 70px;
    background-image: linear-gradient(
      to right,
      ${({ volume }) => `${primary} ${volume}%, rgba(0,0,0,0) ${volume}%`}
    );

    &:focus {
      outline: none;
    }
    &::-webkit-slider-runnable-track {
      width: 100%;
      height: 6px;
      cursor: pointer;
      background: ${hexToRGBA(primary, 0.2)};
      border-radius: 1.3px;
      border: 0px;
    }

    &::-webkit-slider-thumb {
      border: 1px solid ${primaryDark};
      height: 12px;
      width: 12px;
      border-radius: 6px;
      background: ${white};
      cursor: pointer;
      -webkit-appearance: none;
      margin-top: -3px;
    }

    &::-moz-range-track {
      width: 100%;
      height: 6px;
      cursor: pointer;
      background: ${hexToRGBA(primary, 0.2)};
      border-radius: 1.3px;
      border: 0px;
    }
    &::-moz-range-thumb {
      border: 1px solid ${primaryDark};
      height: 12px;
      width: 12px;
      border-radius: 6px;
      background: ${white};
      cursor: pointer;
    }
    &::-ms-track {
      width: 100%;
      height: 6px;
      cursor: pointer;
      background: transparent;
      border-color: transparent;
      border-width: 16px 0;
      color: transparent;
    }
    &::-ms-fill-lower {
      background: ${primaryDark};
      border: 0px;
      border-radius: 2.6px;
    }
    &::-ms-fill-upper {
      background: ${hexToRGBA(primary, 0.2)};
      border: 0px;
      border-radius: 2.6px;
    }
    &::-ms-thumb {
      border: 1px solid ${primaryDark};
      height: 12px;
      width: 12px;
      border-radius: 6px;
      background: ${white};
      cursor: pointer;
    }
    &:focus::-ms-fill-lower {
      background: ${hexToRGBA(primary, 0.2)};
    }
    &:focus::-ms-fill-upper {
      background: ${primary};
    }
  }
`;
