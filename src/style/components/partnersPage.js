import styled from 'styled-components';

export const PartnerGrid = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  margin-bottom: 2rem;
  margin-top: 2rem;
  width: 100%;

  img {
    object-fit: contain;
  }
`;

export const TextContainer = styled.div`
  padding: 0 1rem;
  h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
`;
