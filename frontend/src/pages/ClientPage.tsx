import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import { ChatRoom } from '@components/chat';
import { ClientView, Header } from '@components/client';
import { AsyncBoundary } from '@components/common/AsyncBoundary';
import { PlayerStreamError } from '@components/error';
import withLiveExistCheck from '@hocs/withLiveExistCheck';

function ClientPageComponent() {
  return (
    <>
      <Helmet>
        <meta name="description" content="클라이언트 페이지로, 실시간 스트리밍 및 채팅 기능을 제공합니다." />
        <title>클라이언트 페이지</title>
      </Helmet>
      
      <Header />
      <ClientContainer>
        <AsyncBoundary pendingFallback={<></>} rejectedFallback={() => <PlayerStreamError />}>
          <ClientView />
          <ChatRoom userType="client" />
        </AsyncBoundary>
      </ClientContainer>
    </>
  );
}

const ClientPage = withLiveExistCheck(ClientPageComponent);

export default ClientPage;

const ClientContainer = styled.div`
  box-sizing: border-box;
  padding-top: 70px;
  height: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.tokenColors['susrface-default']};
`;
