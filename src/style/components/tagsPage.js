import styled from 'styled-components';
import Link from 'components/Link';
import { emerald } from '../colors';

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const Item = styled.li`
  display: inline-block;
  padding: 0 0.5rem 0.5rem 0;
  margin: 0 0.5rem 0.5rem 0;
`;

export const TagLink = styled(Link)`
  display: flex;
  border: 1px solid ${emerald};
  color: ${emerald};
  padding: 0.5rem 0.8rem;

  &:hover {
    filter: brightness(110%);
  }
`;
