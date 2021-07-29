import styled from 'styled-components';

export const StyledText = styled.div`
  white-space: nowrap;
  filter: url(#filter);
  outline: none;
  color: #fefefe;
  display: flex;
  align-content: center;
  font-size: 10em;
  max-width: 99%;
  justify-content: center;

  &::selection {
    background: rgba(255, 255, 255, .2);
  }
`;
