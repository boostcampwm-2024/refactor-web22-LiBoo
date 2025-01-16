import { memo, useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import QuestionCard from './QuestionCard';
import { MessageReceiveData, UserInfoData } from '@type/chat';
import { CHATTING_SOCKET_SEND_EVENT } from '@constants/chat';
import { useChatUIContext } from '@contexts/ChatUIContext';
import { useChatWorkerContext } from '@contexts/ChatWorkerContext';
import { useChatSessionContext } from '@contexts/ChatSessionContext';

export interface ChatQuestionSectionProps {
  questions: MessageReceiveData[];
}

const buildUserInfoData = (question: MessageReceiveData): UserInfoData => ({
  nickname: question.nickname,
  socketId: question.socketId,
  entryTime: question.entryTime,
  owner: question.owner
});

const ChatQuestionSection = ({ questions }: ChatQuestionSectionProps) => {
  const [expanded, setExpanded] = useState(false);

  const { sendMessage } = useChatWorkerContext();
  const { userType, roomId, userId } = useChatSessionContext();
  const { handlers } = useChatUIContext();

  const toggleSection = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  const handleQuestionDone = useCallback(
    (questionId: number) => {
      sendMessage(CHATTING_SOCKET_SEND_EVENT.QUESTION_DONE, {
        roomId,
        userId,
        questionId
      });
    },
    [roomId, userId]
  );

  const onNicknameClick = useCallback(
    (data: UserInfoData) => {
      handlers.setSelectedUser(data);
    },
    [handlers]
  );

  useEffect(() => {
    if (questions.length === 0) setExpanded(false);
  }, [questions]);

  return (
    <SectionWrapper>
      <SectionContainer>
        {questions.length ? (
          <>
            {questions.slice(0, expanded ? undefined : 1).map((question, index) => (
              <QuestionCard
                key={question.questionId}
                type={userType}
                question={question}
                handleQuestionDone={handleQuestionDone}
                ellipsis={index === 0 ? !expanded : undefined}
                onNicknameClick={() => onNicknameClick(buildUserInfoData(question))}
              />
            ))}
            <SwipeBtn onClick={toggleSection} />
          </>
        ) : (
          <NoQuestionMessage>아직 질문이 없어요 ( °ᗝ° ).ᐟ.ᐟ</NoQuestionMessage>
        )}
      </SectionContainer>
    </SectionWrapper>
  );
};

export default memo(ChatQuestionSection);

const SectionWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #090909;
  border-top: 1px solid ${({ theme }) => theme.tokenColors['surface-alt']};
  border-bottom: 1px solid ${({ theme }) => theme.tokenColors['surface-alt']};
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 25px;
  max-height: 300px;
  overflow-y: scroll;
  scrollbar-width: none;
  padding: 13px 20px 25px 20px;
  gap: 10px;
`;

const SwipeBtn = memo(styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20px;
  cursor: pointer;
  background-color: #090909;
  &::before {
    content: '';
    position: absolute;
    top: 40%;
    left: 50%;
    background-color: ${({ theme }) => theme.tokenColors['text-weak']};
    border-radius: 2px;
    height: 4px;
    width: 60px;
    transform: translate(-50%, -50%);
  }
`);

const NoQuestionMessage = styled.div`
  text-align: center;
  ${({ theme }) => theme.tokenTypographys['display-medium14']};
  color: ${({ theme }) => theme.tokenColors['text-weak']};
  padding: 15px 0 0 0;
`;
