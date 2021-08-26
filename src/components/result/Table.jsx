import styled from "styled-components";
import { useSelector } from "react-redux";

export default function TableLayOut({ title, caption, cols, rows }) {
    return (
        <>
            {(title === "학력별" || title === "전공별") && <h3>종사자 평균 {title}</h3>}
            <Table>
                <caption className="visually-hidden">{caption}</caption>
                <thead>{cols}</thead>
                <tbody>{rows}</tbody>
            </Table>
        </>
    );
}

export function UserInfo() {
    const { name, gender, startDtm } = useSelector(state => state.qaData.answer_sheet);

    const cols = (
        <Tr>
            <th scope="col">이름</th>
            <th scope="col">성별</th>
            <th scope="col">검사일</th>
        </Tr>
    );

    const rows = (
        <Tr>
            <td>{name}</td>
            <td>{gender === "100323" ? "남성" : "여성"}</td>
            <td>{new Date(startDtm).toLocaleDateString()}</td>
        </Tr>
    );

    return <TableLayOut caption={"검사자정보"} cols={cols} rows={rows} />;
}

export function MajorTable() {
    const { jobdata_major } = useSelector(state => state.resultData);
    const cols = (
        <Tr>
            <th scope="col">분야</th>
            <th scope="col">직업명</th>
        </Tr>
    );

    const rows = jobdata_major.map(
        (md, index) =>
            md.jobs && (
                <Tr key={index}>
                    <th scope="row">{md.major}</th>
                    <td>{md.jobs}</td>
                </Tr>
            )
    );

    return (
        <TableLayOut
            title="전공별"
            caption="종사자 평균 전공별 직업군 표"
            cols={cols}
            rows={rows}
        />
    );
}

export function EduTable() {
    const { jobdata_edu } = useSelector(state => state.resultData);

    const cols = (
        <Tr>
            <th scope="col">분야</th>
            <th scope="col">직업명</th>
        </Tr>
    );

    const rows = jobdata_edu.map(
        (ed, index) =>
            ed.jobs && (
                <Tr key={index}>
                    <th scope="row">{ed.edu}</th>
                    <td>{ed.jobs}</td>
                </Tr>
            )
    );

    return (
        <TableLayOut
            title={"학력별"}
            caption={"종사자 평균 학력별 직업군표"}
            cols={cols}
            rows={rows}
        />
    );
}

const Table = styled.table`
    width: 100%;
    & > thead {
        font-weight: bold;
        text-align: center;
        background-color: #f2f2f2;
    }
`;

const Tr = styled.tr`
    & > td {
        border: 1px solid #a2a2a2;
        padding: 8px 10px;
    }

    & > th {
        padding: 8px 10px;
    }

    & > th[scope="row"] {
        border: 1px solid #a2a2a2;
        padding: 8px 10px;
        text-align: center;
    }

    & > th[scope="col"] {
        border: 1px solid #a2a2a2;
        border-bottom: 0;
    }
`;
