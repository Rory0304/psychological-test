import React from 'react';
import { Bar } from 'react-chartjs-2';

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
} from 'chart.js';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { Colors } from 'src/styles';
import styled from 'styled-components';

ChartJS.register(CategoryScale, BarElement, Tooltip, LinearScale);

export const BAR_OPTIONS = {
  responsive: true,
  legend: {
    display: false,
  },
  scales: {
    x: {
      grid: {
        drawBorder: false,
        display: false,
      },
    },
    y: {
      min: 0,
      max: 10,
      stepSize: 1,
    },
  },
  plugins: {
    title: {
      display: false,
    },
  },
};

const ValueGraph: React.FC = () => {
  const { name } = useAppSelector(state => state.psyUserInfo);
  const { score_data, bestTwo, worstTwo } = useAppSelector(
    state => state.psyResult
  );

  const labels = score_data.map(data => data.jobValue);

  const data = {
    labels,
    datasets: [
      {
        data: score_data.map(data => data.score),
        backgroundColor: Colors.mainGreen,
      },
    ],
  };

  return (
    <StyledValueTableArea>
      <p>
        직업생활과 관련하여 <b>{name}</b>님은<b> {bestTwo[0]}</b>(와)과{' '}
        <b>{bestTwo[1]}</b>
        (을)를 가장 중요하게 생각합니다. 반면에{' '}
        <b>
          {worstTwo[0]},{worstTwo[1]}
        </b>
        은(는) 상대적으로 덜 중요하게 생각합니다.
      </p>
      <div className="visually-hidden">
        <p>Web accessibility status: 직업 가치관 검사 결과</p>
        <ul>
          {score_data.map(data => (
            <li key={data.key}>
              {data.jobValue}: {data.score}점
            </li>
          ))}
        </ul>
      </div>
      <Bar options={BAR_OPTIONS} data={data} />
    </StyledValueTableArea>
  );
};

const StyledValueTableArea = styled.div`
  position: relative;

  p {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  b {
    color: ${Colors.mainBlue};
  }
`;

export default ValueGraph;
