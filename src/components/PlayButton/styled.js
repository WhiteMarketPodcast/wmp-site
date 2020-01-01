import styled from 'styled-components'
import { seeThruPrimary, primary, white } from 'style/colors'

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${seeThruPrimary};
  border: 0;
  border-radius: 0;
  color: ${white};
  line-height: 1;
  margin: 0.5rem;
  padding: 0.5rem;
  transition: all 0.2s ease;
  font-size: 2rem;

  &:hover,
  &:focus {
    background-color: ${primary};
  }
`
