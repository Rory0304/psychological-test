import React from "react";
import styled from "styled-components";
import { Colors } from "src/styles";

import { useAppSelector } from "src/hooks/useAppSelector";
import { fetchScoreData } from "src/modules/psyResult";
import { MainWrapper, IntroWrapper } from "src/components/common/Wrapper";
import { useAppDispatch } from "src/hooks/useAppDispatch";

interface PreviewPageProps {
    onResultPageShow: () => void;
}

const PreviewPage: React.FC<PreviewPageProps> = ({ onResultPageShow }) => {
    const dispatch = useAppDispatch();
    const userData = useAppSelector(state => state.psyUserInfo);
    const answerData = useAppSelector(state => state.psyAnswerSheet);
    const { bestTwo, worstTwo, loading } = useAppSelector(state => state.psyResult);

    React.useEffect(() => {
        if (answerData && userData) {
            return dispatch(fetchScoreData(userData, answerData));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [answerData, userData]);

    if (loading) {
        <div>loading...</div>;
    }

    return (
        <MainWrapper center={true}>
            <main role="main">
                <IntroWrapper>
                    <h1>검사가 완료되었습니다.</h1>
                    <p>
                        검사 결과는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게
                        생각하는지를 알려주고, 중요 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼
                        기회를 제공합니다.
                    </p>
                    <p>
                        직업생활과 관련하여 <b>{userData.name}</b>님은<b> {bestTwo[0]}</b>(와)과{" "}
                        <b>{bestTwo[1]}</b>
                        (을)를 가장 중요하게 생각합니다. 반면에{" "}
                        <b>
                            {worstTwo[0]},{worstTwo[1]}
                        </b>
                        은(는) 상대적으로 덜 중요하게 생각합니다.
                    </p>
                    <ViewResultButton type="button" onClick={onResultPageShow}>
                        결과 확인하기
                    </ViewResultButton>
                </IntroWrapper>
            </main>
        </MainWrapper>
    );
};

const ViewResultButton = styled.button`
    display: block;
    background-color: "white";
    width: 50%;
    background-color: ${Colors.mainBlue};
    color: ${Colors.mainWhite};
    border: 0;
    padding: 15px 10px;
    margin: 0 auto;
`;

export default PreviewPage;
