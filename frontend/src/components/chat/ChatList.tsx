import styled from 'styled-components';
import { useCallback, useEffect, useRef, useState } from 'react';
import { UserInfoData, MessageReceiveData } from '@type/chat';
import { useChatUIContext } from '@contexts/ChatUIContext';
import ChatAutoScroll from './ChatAutoScroll';
import ChatItem from './ChatItem';

export interface ChatListProps {
  messages: MessageReceiveData[];
}

const ChatList = ({ messages }: ChatListProps) => {
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [currentChat, setCurrentChat] = useState<MessageReceiveData | null>(null);

  const chatListRef = useRef<HTMLDivElement | null>(null);

  const { handlers } = useChatUIContext();

  const onNicknameClick = useCallback(
    (data: UserInfoData) => {
      handlers.setSelectedUser(data);
    },
    [handlers]
  );

  const checkIfAtBottom = () => {
    if (!chatListRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatListRef.current;
    const atBottom = scrollHeight - scrollTop - clientHeight < 1;
    setIsAtBottom(atBottom);
    if (atBottom && currentChat) {
      setCurrentChat(null);
    }
  };

  const scrollToBottom = () => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
      setCurrentChat(null);
    }
  };

  useEffect(() => {
    if (chatListRef.current && isAtBottom) {
      scrollToBottom();
    } else {
      setCurrentChat(messages[messages.length - 1]);
    }
  }, [messages]);

  return (
    <ChatListSection>
      <ChatListWrapper ref={chatListRef} onScroll={checkIfAtBottom}>
        {messages.map((chat, index) => (
          <ChatItem chat={chat} key={index} onNicknameClick={onNicknameClick} />
        ))}
      </ChatListWrapper>
      <ChatAutoScroll currentChat={currentChat} isAtBottom={isAtBottom} scrollToBottom={scrollToBottom} />
    </ChatListSection>
  );
};

export default ChatList;

const ChatListSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  overflow-y: hidden;
`;

const ChatListWrapper = styled.div`
  box-sizing: border-box;
  max-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 50px 20px 0 20px;
  scrollbar-width: none;
  gap: 12px;
`;
