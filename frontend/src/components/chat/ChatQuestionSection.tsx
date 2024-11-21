import { useState } from 'react';
import styled from 'styled-components';
import QuestionCard from './QuestionCard';
import { MessageReceiveData, MessageSendData } from '@type/chat';
import { Socket } from 'socket.io-client';
import { CHATTING_SOCKET_SEND_EVENT } from '@constants/chat';
import { useParams } from 'react-router-dom';
import { getStoredId } from '@utils/id';
import { UserType } from '@type/user';

export interface ChatQuestionSectionProps {
  questions: MessageReceiveData[];
  socket: Socket | null;
  userType: UserType;
  roomId?: string;
}

export const ChatQuestionSection = ({ questions, socket, userType, roomId }: ChatQuestionSectionProps) => {
  const [expanded, setExpanded] = useState(false);

  const { id } = useParams();

  const userId = getStoredId();

  const toggleSection = () => {
    setExpanded((prev) => !prev);
  };

  const handleQuestionDone = (questionId: number) => {
    if (!socket) return;

    socket.emit(CHATTING_SOCKET_SEND_EVENT.QUESTION_DONE, {
      roomId: id ? id : roomId,
      userId,
      questionId
    } as MessageSendData);
  };

  return (
    <SectionWrapper>
      <SectionContainer>
        {questions.length === 0 ? (
          <NoQuestionMessage>아직 질문이 없어요</NoQuestionMessage>
        ) : (
          <>
            <QuestionCard
              key={questions[0].questionId}
              type={userType}
              question={questions[0]}
              handleQuestionDone={handleQuestionDone}
            />
            {expanded &&
              questions
                .slice(1)
                .map((question) => (
                  <QuestionCard
                    key={question.questionId}
                    type={userType}
                    question={question}
                    handleQuestionDone={handleQuestionDone}
                  />
                ))}
            <SwipeBtn onClick={toggleSection} />
          </>
        )}
      </SectionContainer>
    </SectionWrapper>
  );
};
export default ChatQuestionSection;

const SectionWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
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
  border-top: 1px solid ${({ theme }) => theme.tokenColors['surface-alt']};
  border-bottom: 1px solid ${({ theme }) => theme.tokenColors['surface-alt']};
`;

const SwipeBtn = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 25px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.tokenColors['surface-default']};

  &::before {
    content: '';
    position: absolute;
    top: 35%;
    left: 50%;
    background-color: ${({ theme }) => theme.tokenColors['text-weak']};
    border-radius: 2px;
    height: 5px;
    width: 50px;
    transform: translate(-50%, -50%);
  }
`;

const NoQuestionMessage = styled.div`
  text-align: center;
  ${({ theme }) => theme.tokenTypographys['display-medium14']};
  color: ${({ theme }) => theme.tokenColors['text-weak']};
  padding: 20px 0;
`;
