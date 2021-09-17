import { useSelector } from "react-redux";
import tw, { styled } from "twin.macro";

function ValueGraph() {
    const { name } = useSelector(state => state.qaData.answer_sheet);
    const { score_data, bestTwo, worstTwo } = useSelector(
        state => state.resultData
    );

    const cols = (
        <tr>
            {score_data.map((score, index) => (
                <th scope="col" key={index}>
                    {score.jobValue}
                </th>
            ))}
        </tr>
    );

    const rows = (
        <tr>
            {score_data.map((score, index) => (
                <td
                    id={`bar${index}`}
                    key={index}
                    style={{
                        height: `${score.score === 0 ? 18 : 50 * score.score}px`
                    }}
                >
                    <span>{score.score}</span>
                </td>
            ))}
        </tr>
    );

    const ticks = [];
    for (let i = 0; i < 11; i++) {
        ticks.push(
            <div className="relative h-12 border-dotted border-b-1 border-gray-border"></div>
        );
    }

    return (
        <div className="relative">
            <p className="text-xl leading-7">
                직업생활과 관련하여 <b>{name}</b>님은<b> {bestTwo[0]}</b>(와)과{" "}
                <b>{bestTwo[1]}</b>
                (을)를 가장 중요하게 생각합니다. 반면에{" "}
                <b>
                    {worstTwo[0]},{worstTwo[1]}
                </b>
                은(는) 상대적으로 덜 중요하게 생각합니다.
            </p>
            <ValueTable>
                <caption className="visually-hidden">가치관 별 점수</caption>
                <thead className="absolute w-full -bottom-10">{cols}</thead>
                <tbody>{rows}</tbody>
            </ValueTable>
            <div>{ticks}</div>
        </div>
    );
}

const ValueTable = styled.table`
    & > thead > tr {
        ${tw`flex text-center gap-x-5`}
    }

    & > thead > th {
        ${tw``}
        height: 50px;
        padding: 0;
        border: 0;
        line-height: 50px;
        white-space: nowrap;
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    & > tbody > tr {
        width: 100%;
        display: flex;
        justify-content: space-around;
        position: absolute;
        bottom: 0;
        flex-direction: row;
        align-content: center;
        align-items: flex-end;
        column-gap: 19px;

        & > td {
            text-align: center;
            z-index: 1;
            background-color: #ffbf7c;
        }
    }

    & > thead > th,
    & > tbody > td {
        width: calc(100% / 7);
    }
`;

export default ValueGraph;
