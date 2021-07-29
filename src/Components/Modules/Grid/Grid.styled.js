import styled from 'styled-components';
export const Cell = styled.div`
  width: 40px;
  height: 40px;
  /* backgroundColor: grid[i][k] ? 'pink' : '#f0f0f0', */
  background-color: wheat;
  background-color: ${props => (props.color === '#010101' ? 'red' : props.color === '#fff' ? '#e69a3c' : 'wheat')};
  border: solid 1px #ffb309;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.color};
  font-size: ${props => (props.color === '#010101' ? '35px' : '25px')};
`;
