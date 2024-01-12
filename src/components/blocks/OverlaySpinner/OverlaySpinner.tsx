import React from 'react';

import { Colors } from 'src/styles';
import styled from 'styled-components';

const OverlaySpinner: React.FC = () => {
  return (
    <StyledOverlaySpinner>
      <StyledSpinner />
    </StyledOverlaySpinner>
  );
};

const StyledOverlaySpinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledSpinner = styled.div`
  width: 48px;
  height: 48px;
  border: 5px solid ${Colors.mainGreen};
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  z-index: 10;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default OverlaySpinner;
