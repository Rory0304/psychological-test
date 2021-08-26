import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";

import "./ValueGraph.css";

function ValueGraph() {
    const { name } = useSelector(state => state.qaData.answer_sheet);
    const { score_data, bestTwo, worstTwo } = useSelector(state => state.resultData);

    const cols = (
        <tr>
            {score_data.map(
                (score, index) =>
                    score.score && (
                        <th scope="col" key={index}>
                            {score.jobValue}
                        </th>
                    )
            )}
        </tr>
    );

    const rows = (
        <tr>
            {score_data.map(
                (score, index) =>
                    score.score && (
                        <td
                            id={`bar${index}`}
                            key={index}
                            style={{ height: `${50 * score.score}px` }}
                        >
                            {score.score}
                        </td>
                    )
            )}
        </tr>
    );

    const ticks = [];
    for (let i = 0; i < 10; i++) {
        ticks.push(<div class="tick"></div>);
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
}

export default ValueGraph;
