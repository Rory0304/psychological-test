import styled from 'styled-components';

import { Colors, Typography } from '.';

export const StyledIntroWrapper = styled.div`
  width: 100%;

  & > h1 {
    font-size: ${Typography.big};
    font-weight: bold;
    padding-bottom: 20px;
    border-bottom: 4px solid #2ed573;
  }

  & > p {
    font-size: ${Typography.middle2};
    color: ${Colors.fontSecondary};
    padding: 1rem 0;
    white-space: pre-line;

    b {
      color: ${Colors.mainBlue};
    }
  }
`;

export const StyledExamineWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  position: relative;
  flex-direction: column;

  header {
    width: 100%;
    font-size: ${Typography.big};
    margin: 1.5rem 0;

    & > h2 {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      font-weight: bold;
      padding-bottom: 1rem;
      align-items: center;
      justify-content: space-between;
      color: ${Colors.fontBlue};

      & > span {
        color: ${Colors.fontBlue};
      }
    }
  }

  main {
    width: 100%;
  }
`;
