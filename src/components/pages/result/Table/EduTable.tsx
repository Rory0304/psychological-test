import React from 'react';

import Table, { StyledTr } from 'src/components/blocks/Table/Table';
import { JobDataEduProps } from 'src/types/psyResult';

interface EduTableProps {
  jobDataEdu: JobDataEduProps[];
}

const EduTable: React.FC<EduTableProps> = ({ jobDataEdu }) => {
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

  const rows = jobDataEdu.map(
    (ed, index) =>
      ed.jobs && (
        <StyledTr key={`edu-${index}`}>
          <th scope="row">{ed.edu}</th>
          <td>{ed.jobs}</td>
        </StyledTr>
      )
  );

  return (
    <Table
      title={'종사자 평균 학력별'}
      caption={'종사자 평균 학력별 직업군표'}
      colgroup={colgroup}
      cols={cols}
      rows={rows}
    />
  );
};

export default EduTable;
