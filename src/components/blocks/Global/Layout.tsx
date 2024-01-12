import React from 'react';

import { Breakpoints } from 'src/styles';
import styled from 'styled-components';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <StyledLayout>
      <StyledContentLayout>{children}</StyledContentLayout>
    </StyledLayout>
  );
};

const StyledLayout = styled.div`
  width: 100%;
  background-color: #edf3fb;
`;

const StyledContentLayout = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;

  @media ${Breakpoints.tabletSmaller} {
    max-width: 768px;
  }
`;

export default Layout;
