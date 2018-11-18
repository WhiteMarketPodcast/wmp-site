import styled from 'styled-components';
import Link from 'components/Link';
import { onMobile } from 'style/mediaQueries';
import { primary } from 'style/colors';

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;

  ${onMobile} {
    justify-content: center;
  }
`;

export const Item = styled.li`
  display: inline-block;
  margin: 0.3rem;

  ${onMobile} {
    margin: 0.2rem;
  }
`;

export const TagLink = styled(Link)`
  display: flex;
  border: 1px solid ${primary};
  color: ${primary};
  line-height: 1.2;
  padding: 0.5rem 0.8rem;

  ${onMobile} {
    padding: 0.3rem 0.5rem;
    text-align: center;
  }

  &:hover {
    filter: brightness(110%);
  }
`;
