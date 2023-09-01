import React from "react";
import Table, { StyledTr } from "src/components/common/Table";

interface UserInfoTableProps {
    name: string;
    gender: string;
    startDtm: number | null;
}

const UserInfoTable: React.FC<UserInfoTableProps> = ({ name, gender, startDtm }) => {
    const cols = (
        <StyledTr>
            <th scope="col">이름</th>
            <th scope="col">성별</th>
            <th scope="col">검사일</th>
        </StyledTr>
    );

    const rows = (
        <StyledTr>
            <td>{name}</td>
            <td>{gender === "100323" ? "남성" : "여성"}</td>
            {startDtm ? <td>{new Date(startDtm).toLocaleDateString()}</td> : null}
        </StyledTr>
    );

    return <Table caption={"검사자정보"} cols={cols} rows={rows} />;
};

export default UserInfoTable;
