import React from 'react';

import Table, { StyledTr } from 'src/components/common/Table';
import { JobDataMajorProps } from 'src/types/psyResult';

interface MajorTableProps {
  jobDataMajor: JobDataMajorProps[];
}

const MajorTable: React.FC<MajorTableProps> = ({ jobDataMajor }) => {
  const colgroup = (
    <colgroup>
      <col width="15%" />
      <col />
    </colgroup>
  );

  const cols = (
    <StyledTr>
      <th scope="col">분야</th>
      <th scope="col">직업명</th>
    </StyledTr>
  );

  const rows = jobDataMajor.map((md, index) =>
    md.jobs ? (
      <StyledTr key={`jobs-${index}`}>
        <th scope="row">{md.major}</th>
        <td>{md.jobs}</td>
      </StyledTr>
    ) : (
      <></>
    )
  );

  return (
    <Table
      title="종사자 평균 전공별"
      caption="종사자 평균 전공별 직업군 표"
      colgroup={colgroup}
      cols={cols}
      rows={rows}
    />
  );
};

export default MajorTable;
