import styled from "styled-components";
import { Colors, FontSize } from "./StyledConstants";

export const StartButton = styled.button`
    width: 25%;
    margin-top: 1rem;
    font-size: 15px;
    font-weight: bold;
    margin: 0 auto;
    padding: 10px 8px;
    border: 2px solid ${Colors.mainBlue};
    border-radius: 8px;
    background-color: ${props => (props.status ? Colors.mainBlue : Colors.mainWhite)};
    color: ${props => (props.status ? Colors.mainWhite : Colors.mainBlue)};
    font-size: ${FontSize.middle2};
    &:hover {
        box-shadow: 1px 1px 5px 1px ${Colors.shadowGray};
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
        box-shadow: 1px 1px 5px 1px ${Colors.shadowGray};
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
    background-color: ${Colors.mainBlue};
    color: #fff;
    transition: background-color 0.5s ease;
    font-size: ${FontSize.middle2};

    &:disabled {
        opacity: 56%;
    }

    &:hover {
        box-shadow: 1px 1px 5px 1px ${Colors.shadowGray};
    }
`;
export const ViewResultButton = styled.button`
    display: block;
    background-color: "white";
    width: 50%;
    background-color: ${Colors.mainBlue};
    color: ${Colors.mainWhite};
    border: 0;
    padding: 15px 10px;
    margin: 0 auto;
`;

export const MoveToMainButton = styled.button`
    width: 50%;
    background-color: ${Colors.mainBlue};
    color: ${Colors.mainWhite};
    border: 0;
    padding: 15px 10px;
    margin: 0 auto;
`;
