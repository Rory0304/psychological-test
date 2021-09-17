import { Colors, FontSize } from "./StyledConstants";
import tw, { styled } from "twin.macro";

export const StartButton = styled.button`
    display: block;
    width: 25%;
    margin-top: 1rem;
    font-weight: bold;
    margin: 0 auto;
    padding: 8px;
    border: ${tw`border-2 border-blue`};
    border-radius: 8px;
    ${props => (props.status ? tw`bg-blue` : tw`bg-white`)};
    ${props => (props.status ? tw`text-white` : tw`text-blue`)};
    &:hover {
        ${tw`shadow`}
    }
`;

export const PaginationButton = styled.button`
    border: none;
    padding: 8px 15px;
    border-radius: 11px;
`;

export const PrevButton = styled.button`
    width: 47%;
    height: 50px;
    border: none;
    padding: 8px 15px;
    border-radius: 11px;
    color: #000;
    background-color: ${Colors.mainGrayDarker};
    opacity: 56%;
    font-size: ${FontSize.middle2};
    visibility: ${props => (props.status ? "hidden" : "visible")};
    &:hover {
        ${tw`shadow`}
    }
`;

export const NextButtonLabel = styled.label`
    width: 100%;
    font-size: ${FontSize.small};
    visibility: ${props => (props.status ? "visible" : "hidden")};
    margin-bottom: 10px;
    text-align: center;
`;

export const NextButton = styled.button`
    width: 100%;
    height: 50px;
    border: none;
    padding: 8px 15px;
    border-radius: 11px;
    ${tw`bg-blue`};
    color: #fff;
    transition: background-color 0.5s ease;
    font-size: ${FontSize.middle2};

    &:disabled {
        opacity: 56%;
    }

    &:hover {
        ${tw`shadow`}
    }
`;
export const ViewResultButton = styled.button`
    display: block;
    width: 50%;
    ${tw`bg-blue`};
    ${tw`text-white`};
    border: 0;
    padding: 15px 10px;
    margin: 0 auto;
`;

export const MoveToMainButton = styled.button`
    width: 50%;
    ${tw`bg-blue`};
    ${tw`text-white`};
    border: 0;
    padding: 15px 10px;
    margin: 0 auto;
`;
