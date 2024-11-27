import { Suspense } from 'react';
import { styled } from 'styled-components';

import Footer from '@common/Footer';
import ServiceBanner from '@common/ServiceBanner';
import { MainHeader, MainLiveSection, MainReplaySection, RecommendLive } from '@components/main';

export default function MainPage() {
  return (
    <>
      <MainHeader />
      <MainPageContainer>
        <Suspense
          fallback={
            <div
              style={{
                width: '100%',
                height: '370px',
                backgroundColor: 'red',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white'
              }}
            >
              로딩중...
            </div>
          }
        >
          <RecommendLive />
        </Suspense>
        <ServiceBanner />
        <MainLiveSection title="🚀 라이브 중인 컨퍼런스" />
        <MainReplaySection title="컨퍼런스 다시보기 👀" />
        <Footer />
      </MainPageContainer>
    </>
  );
}

const MainPageContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-width: 900px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 90px 45px;
  gap: 40px;
  background: ${({ theme }) => theme.tokenColors['surface-default']};
`;
