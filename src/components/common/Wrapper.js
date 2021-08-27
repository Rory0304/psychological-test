import styled from "styled-components";
import { FontSize, Colors } from "./StyledConstants";

export const MainWrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    & > main {
        width: 70%;
    }
`;

export const IntroWrapper = styled.div`
    & > h1 {
        font-size: ${FontSize.veryBig};
        font-weight: bold;
        padding-bottom: 20px;
        border-bottom: 4px solid ${Colors.mainBlue};
    }

    & > p {
        font-size: ${FontSize.middle1};
        line-height: 24px;
        color: ${Colors.fontGray};
        padding: 35px 0;
    }
`;

export const ExamineWrapper = styled.div`
    width: 70%;
    margin: 0 auto;

    & > header {
        font-size: ${FontSize.big};
        position: relative;
        margin: 20px 0;

        & > h2 {
            padding-bottom: 15px;
            & > span {
                position: absolute;
                right: 0;
                top: 0;
            }
        }
    }
`;
