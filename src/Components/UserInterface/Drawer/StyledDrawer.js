import styled from 'styled-components';

export const DrawerContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  z-index: 100;
`;

export const LeftDrawer = styled.div`
  width: 30%;
  height: 100%;
  background: #efefef;
`;

export const RightDrawer = styled.div`
  width: 100%;
  height: 100%;
  background: #333;
`;
