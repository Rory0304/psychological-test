import React from "react";
import styled from "styled-components";
import { Typography } from "src/styles";

interface TableProps {
    title?: string;
    caption: string;
    colgroup?: React.ReactNode;
    cols: React.ReactNode;
    rows: React.ReactNode;
}

const StyledTable = styled.table`
    width: 100%;
    font-size: ${Typography.middle2};
    & > thead {
        font-weight: bold;
        text-align: center;
        background-color: #f2f2f2;
    }
`;

export const StyledTr = styled.tr`
    & > td {
        border: 1px solid #a2a2a2;
        padding: 15px;
        line-height: 25px;
    }

    & > th {
        padding: 15px;
    }

    & > th[scope="row"] {
        border: 1px solid #a2a2a2;
        padding: 8px 10px;
        text-align: center;
        vertical-align: middle;
    }

    & > th[scope="col"] {
        border: 1px solid #a2a2a2;
        border-bottom: 0;
    }
`;

const Table: React.FC<TableProps> = ({ title, caption, colgroup, cols, rows }) => {
    return (
        <>
            {!!title ? <h3>{title}</h3> : null}
            <StyledTable>
                <caption className="visually-hidden">{caption}</caption>
                {!!colgroup ? colgroup : null}
                <thead>{cols}</thead>
                <tbody>{rows}</tbody>
            </StyledTable>
        </>
    );
};

export default Table;
