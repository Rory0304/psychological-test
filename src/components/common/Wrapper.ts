import styled from "styled-components";
import { Colors, Typography } from "../../styles";

export const MainWrapper = styled.div<{ center: boolean }>`
    width: 100%;
    height: ${props => (props.center ? "100vh" : "auto")};
    display: flex;
    justify-content: center;
    align-items: center;

    & > main {
        width: 70%;
    }
`;

export const IntroWrapper = styled.div`
    & > h1 {
        font-size: ${Typography.veryBig};
        font-weight: bold;
        padding-bottom: 20px;
        border-bottom: 4px solid ${Colors.mainBlue};
    }

    & > p {
        font-size: ${Typography.middle1};
        color: ${Colors.fontGray};
        padding: 35px 0;
    }
`;

export const ExamineWrapper = styled.div`
    width: 70%;
    margin: 0 auto;

    & > header {
        font-size: ${Typography.big};
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