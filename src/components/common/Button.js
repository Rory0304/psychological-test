import styled from "styled-components";

export const StartButton = styled.button`
    display: block;
    margin: 0 auto;
    font-size: 15px;
    width: 80%;
    border: 1px solid #6558f5;
    color: ${props => (props.status ? "#fff" : "#6558f5")};
    background-color: ${props => (props.status ? "#B2ACFA" : "#fff")};
`;

export const PaginationButton = styled.button`
    border: none;
    padding: 8px 15px;
    border-radius: 11px;
`;

export const PrevButton = styled.button`
    width: 47%;
    border: none;
    padding: 8px 15px;
    border-radius: 11px;
    color: black;
    background-color: #babcbe;
    opacity: 38%;
`;

export const NextButtonLabel = styled.label`
    visibility: ${props => (props.status ? "visible" : "hidden")};
`;

export const NextButton = styled.button`
    width: 100%;
    border: none;
    padding: 8px 15px;
    border-radius: 11px;
    background-color: #4e8fea;
    color: #fff;
    transition: background-color 0.5s ease;

    &:disabled {
        opacity: 0.25;
    }
`;

export const SubmitButton = styled.button`
    background-color: "white";
`;

export const ViewResultButton = styled.button`
    background-color: "white";
`;

export const MoveToMainButton = styled.button`
    width: 100%;
    background-color: #fff;
    color: #4e8fea;
    border: 1px solid #4e8fea;
    padding: 8px 10px;
`;
