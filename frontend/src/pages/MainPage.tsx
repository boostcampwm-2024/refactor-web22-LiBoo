import { Helmet } from 'react-helmet';
import { styled } from 'styled-components';

import { AsyncBoundary } from '@common/AsyncBoundary';
import Footer from '@common/Footer';
import ServiceBanner from '@common/ServiceBanner';
import { RecommendLiveError } from '@components/error';
import { MainHeader, MainLiveSection, MainReplaySection, RecommendLive } from '@components/main';
import { RecommendLiveSkeleton } from '@components/skeleton';

export default function MainPage() {
  return (
    <>
      <Helmet>
        <meta name="description" content="메인 페이지로, 실시간 방송과 다시보기 방송을 볼 수 있는 페이지입니다." />
        <title>메인 페이지</title>
      </Helmet>

      <MainHeader />
      <MainPageContainer>
        <AsyncBoundary
          pendingFallback={<RecommendLiveSkeleton />}
          rejectedFallback={(error) => <RecommendLiveError error={error} />}
        >
          <RecommendLive />
        </AsyncBoundary>
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
