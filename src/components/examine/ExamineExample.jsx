import { StartButton } from "../common/Button";
import ProgressBar from 'react-bootstrap/ProgressBar'

function ExamineExample() {

  return (
      <div className="examine-wrapper">
      <h1>검사 예시</h1>
       <ProgressBar now='0' label='0%' visuallyHidden />
       <article>
              <h2>직업과 관련된 두 개의 가치 중에서 자기에게 더 중요한 가치에 표시하세요.<br /> 가치의 뜻을 잘 모르겠다면 문항 아래에 있는 가치의 설명을 확인해보세요.</h2>
              <div>
                  <p>두 가치 중에 자기에게 더 중요한 가치를 선택하세요.</p>
                  <input type="checkbox"/> 능력 발휘
                  <input type="checkbox"/> 자율성
                  <StartButton>검사 시작</StartButton>
              </div>
          </article>
    </div>
  );
}

export default ExamineExample;