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

export const PrevButton = styled.button`
    background-color: "white";
`;

export const NextButton = styled.button`
    background-color: "white";
`;

export const SubmitButton = styled.button`
    background-color: "white";
`;

export const ViewResultButton = styled.button`
    background-color: "white";
`;

export const MoveToMainButton = styled.button`
    background-color: "white";
`;
