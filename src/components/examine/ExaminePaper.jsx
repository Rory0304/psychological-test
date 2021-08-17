import { PrevButton, NextButton } from "../common/Button";

function ExaminePaper({ title }) {
    return (
        <div className="examine-wrapper">
            <h2>{title}</h2>
            <article></article>
            <PrevButton>이전</PrevButton>
            <NextButton>다음</NextButton>
        </div>
    );
}

export default ExaminePaper;
