import React from 'react';

import styled from 'styled-components';

interface GridProps {
  children: React.ReactNode;
  gridTemplate?: React.CSSProperties['gridTemplate'];
}

const StyledGrid = styled.div<Omit<GridProps, 'children'>>`
  display: grid;
  grid-template: ${props => props.gridTemplate};
`;

const Grid: React.FC<GridProps> = ({ children, gridTemplate }) => {
  return <StyledGrid gridTemplate={gridTemplate}>{children}</StyledGrid>;
};

export default Grid;
