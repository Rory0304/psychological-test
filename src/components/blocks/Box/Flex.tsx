import React from 'react';

import styled from 'styled-components';

interface FlexProps {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  justifyContent?: React.CSSProperties['justifyContent'];
  columnGap?: string;
  rowGap?: string;
}

const StyledFlex = styled.div<Omit<FlexProps, 'children'>>`
  display: flex;
  flex-direction: ${props => props.direction};
  align-items: center;
  column-gap: ${props => props.columnGap};
  row-gap: ${props => props.rowGap};
  justify-content: ${props => props.justifyContent};
`;

const Flex: React.FC<FlexProps> = ({
  children,
  direction = 'row',
  justifyContent = 'left',
  rowGap,
  columnGap,
}) => {
  return (
    <StyledFlex
      direction={direction}
      columnGap={columnGap}
      rowGap={rowGap}
      justifyContent={justifyContent}
    >
      {children}
    </StyledFlex>
  );
};

export default Flex;
