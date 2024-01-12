import React from 'react';
import { Button } from 'react-bootstrap';

import Grid from 'src/components/blocks/Box/Grid';
import { fetchScoreData } from 'src/features/psyResultSlice';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { StyledIntroWrapper } from 'src/styles/wrapper';
import { getKoreanParticle } from 'src/utils/koreanParticle';
import styled from 'styled-components';

interface PreviewPageProps {
  onResultPageShow: () => void;
}

const PreviewPage: React.FC<PreviewPageProps> = ({ onResultPageShow }) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(state => state.psyUserInfo);
  const answerData = useAppSelector(state => state.psyAnswerSheet);
  const { bestTwo, worstTwo, loading } = useAppSelector(
    state => state.psyResult
  );

  React.useEffect(() => {
    if (answerData && userData) {
      dispatch(fetchScoreData({ userData, answerData }));
    }
  }, [answerData, userData]);

  if (loading) {
    <div>loading...</div>;
  }

  return (
    <main role="main">
      <StyledPreviewWrapper>
        <StyledIntroWrapper>
          <h1>검사가 완료되었습니다.</h1>
          <p>
            검사 결과는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를
            중요하게 생각하는지를 알려주고, 중요 가치를 충족시켜줄 수 있는
            직업에 대해 생각해 볼 기회를 제공합니다.
          </p>
          <p>
            직업생활과 관련하여 <b>{userData.name}</b>님은<b> {bestTwo[0]}</b>
            {getKoreanParticle(bestTwo[0], '와/과')} <b>{bestTwo[1]}</b>
            {getKoreanParticle(bestTwo[1], '을/를')} 가장 중요하게 생각합니다.{' '}
            <br />
            반면에,
            <b>{worstTwo[0]}</b>
            {getKoreanParticle(worstTwo[0], '와/과')}
            <b> {worstTwo[1]}</b>
            {getKoreanParticle(worstTwo[1], '은/는')} 상대적으로 덜 중요하게
            생각합니다.
          </p>
          <Grid>
            <Button type="button" size="lg" onClick={onResultPageShow}>
              결과 확인하기
            </Button>
          </Grid>
        </StyledIntroWrapper>
      </StyledPreviewWrapper>
    </main>
  );
};

const StyledPreviewWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default PreviewPage;
