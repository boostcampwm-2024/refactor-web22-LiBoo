import { CHATTING_TYPES } from '@constants/chat';
import { MessageReceiveData, UserInfoData } from '@type/chat';
import { memo, useCallback } from 'react';
import QuestionCard from './QuestionCard';
import styled from 'styled-components';
import HostIconGreen from '@assets/icons/host_icon_green.svg';

interface ChatItemProps {
  chat: MessageReceiveData;
  onNicknameClick: (data: UserInfoData) => void;
}

const getOwnerIcon = (owner: string) => {
  switch (owner) {
    case 'me':
      return '🧀 ';
    case 'host':
      return <StyledIcon as={HostIconGreen} />;
    default:
      return null;
  }
};

const ChatItem = memo(({ chat, onNicknameClick }: ChatItemProps) => {
  const { msgType } = chat;

  const handleNicknameClick = useCallback(() => {
    const { nickname, socketId, entryTime, owner } = chat;
    onNicknameClick({ nickname, socketId, entryTime, owner });
  }, [chat, onNicknameClick]);

  switch (msgType) {
    case CHATTING_TYPES.QUESTION:
      return <QuestionCard type="client" question={chat} onNicknameClick={handleNicknameClick} />;

    case CHATTING_TYPES.NOTICE:
      return (
        <NoticeChat>
          <span>📢</span>
          <span>{chat.msg}</span>
        </NoticeChat>
      );

    case CHATTING_TYPES.EXCEPTION:
      return (
        <NoticeChat>
          <span>🚨</span>
          <span>{chat.msg}</span>
        </NoticeChat>
      );

    default:
      return (
        <NormalChat $isHost={chat.owner === 'host'} $pointColor={chat.owner === 'host' ? '#0ADD91' : chat.color}>
          <span className="text_point user_name" onClick={handleNicknameClick}>
            {getOwnerIcon(chat.owner)}
            {chat.nickname}
          </span>
          <span className="chat_message">{chat.msg}</span>
        </NormalChat>
      );
  }
});

ChatItem.displayName = 'ChatItem';

export default ChatItem;

const NoticeChat = styled.div`
  display: flex;
  padding: 10px 15px;
  gap: 10px;
  ${({ theme }) => theme.tokenTypographys['display-medium12']};
  color: ${({ theme }) => theme.tokenColors['text-default']};
  background-color: #0e0f10;
  border-radius: 8px;
  overflow-wrap: break-word;
  word-break: break-word;
`;

const NormalChat = styled.div<{ $isHost: boolean; $pointColor: string }>`
  ${({ theme }) => theme.tokenTypographys['display-medium14']};
  color: ${({ $isHost, theme }) => ($isHost ? theme.tokenColors['color-accent'] : theme.tokenColors['color-white'])};

  .text_point {
    ${({ theme }) => theme.tokenTypographys['display-bold14']};
    color: ${({ $pointColor }) => $pointColor};
    margin-right: 8px;
    cursor: pointer;
  }

  .chat_message {
    color: ${({ $isHost }) => $isHost && '#82e3c4'};
    line-height: 1.5;
  }

  .user_name {
    cursor: pointer;
    padding: 2px;
    border-radius: 5px;
    &:hover {
      background-color: #393939;
    }
  }

  overflow-wrap: break-word;
  word-break: break-word;
`;

const StyledIcon = styled.svg`
  width: 18px;
  height: 18px;
  cursor: pointer;
  margin: 0 5px -4.5px 0;
`;
