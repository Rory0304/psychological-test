import tw, { styled } from "twin.macro";
import { FontSize } from "./StyledConstants";

export const MainWrapper = styled.div`
    width: 100%;
    height: ${props => (props.center ? "100vh" : "auto")};
    display: flex;
    justify-content: center;
    align-items: center;
    & > main {
        ${tw`w-8/12`}
    }
`;

export const IntroWrapper = styled.div`
    & > h1 {
        ${tw`pb-5 text-5xl font-bold border-b-4 border-blue`}
    }
    & > p {
        ${tw`text-2xl leading-snug md:leading-normal py-7 text-gray-fontgray`}
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
