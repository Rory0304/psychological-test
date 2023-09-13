import React from "react";
import { useAppSelector } from "src/hooks/useAppSelector";

import "./ValueGraph.css";

const ValueGraph: React.FC = () => {
    const { name } = useAppSelector(state => state.psyUserInfo);
    const { score_data, bestTwo, worstTwo } = useAppSelector(state => state.psyResult);

    const cols = (
        <tr>
            <th scope="col" className="visually-hidden">
                직업 가치관
            </th>
            <th scope="col" className="visually-hidden">
                점수
            </th>
        </tr>
    );

    const rows = (
        <>
            {score_data.map((data, index) => (
                <tr key={`score-data-${index}`}>
                    <td>{data.jobValue}</td>
                    <td
                        id={`bar${index}`}
                        style={{
                            height: `${Number(data.score) === 0 ? 18 : 50 * Number(data.score)}px`
                        }}
                    >
                        {data.score}
                    </td>
                </tr>
            ))}
        </>
    );

    const ticks = [];
    for (let i = 0; i < 11; i++) {
        ticks.push(<div className="tick"></div>);
    }

    return (
        <div className="value-table-area">
            <p>
                직업생활과 관련하여 <b>{name}</b>님은<b> {bestTwo[0]}</b>(와)과 <b>{bestTwo[1]}</b>
                (을)를 가장 중요하게 생각합니다. 반면에{" "}
                <b>
                    {worstTwo[0]},{worstTwo[1]}
                </b>
                은(는) 상대적으로 덜 중요하게 생각합니다.
            </p>
            <table className="value-table">
                <caption className="visually-hidden">가치관 별 점수</caption>
                <thead>{cols}</thead>
                <tbody>{rows}</tbody>
            </table>
            <div className="ticks">{ticks}</div>
        </div>
    );
};

export default ValueGraph;
