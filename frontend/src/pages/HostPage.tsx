import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import { ChatRoom } from '@components/chat';
import { Setting, Header } from '@components/host';


export default function HostPage() {
  return (
    <>
      <Helmet>
        <meta name="description" content="호스트 페이지로, 사용자가 방송을 송출할 수 있는 페이지입니다." />
        <title>호스트 페이지</title>
      </Helmet>

      <Header />
      <FlexContainer>
        <Setting />
        <ChatRoom userType="host" />
      </FlexContainer>
    </>
  );
}

const FlexContainer = styled.div`
  box-sizing: border-box;
  height: 100%;
  display: flex;
  padding-top: 60px;
`;
