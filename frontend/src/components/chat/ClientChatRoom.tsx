import { useParams } from 'react-router-dom';
import { ChatRoomLayout } from './ChatRoomLayout';
import { getStoredId } from '@utils/id';
import { useChatRoom } from '@hooks/useChatRoom';
import { useState } from 'react';

const ClientChatRoom = () => {
  const userId = getStoredId();
  const { id: roomId } = useParams();
  const { worker, messages, questions } = useChatRoom(roomId as string, userId);
  const [isChatRoomVisible, setIsChatRoomVisible] = useState(true);

  return (
    <ChatRoomLayout
      worker={worker?.port ?? null}
      messages={messages}
      questions={questions}
      userId={userId}
      userType={'client'}
      roomId={roomId as string}
      isChatRoomVisible={isChatRoomVisible}
      setIsChatRoomVisible={setIsChatRoomVisible}
    />
  );
};

export default ClientChatRoom;
