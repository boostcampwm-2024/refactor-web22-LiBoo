import { createContext, useContext, useEffect, useState } from 'react';
import { UserType } from '@type/user';
import { useParams } from 'react-router-dom';
import { getStoredId } from '@utils/id';
import useFetchStreamKey from '@apis/queries/host/useFetchStreamKey';

interface ChatSessionContextProps {
  userType: UserType;
  roomId: string;
  userId: string;
}

const ChatSessionContext = createContext<ChatSessionContextProps | undefined>(undefined);

export const ChatSessionProvider = ({
  children,
  userType
}: {
  children: React.ReactNode;
  userType: 'client' | 'host';
}) => {
  const { id: clientRoomId } = useParams();
  const [roomId, setRoomId] = useState<string | null>(null);

  const userId = getStoredId();

  const { mutate: fetchSessionKey } = useFetchStreamKey({
    onSuccess: ({ sessionKey }) => setRoomId(sessionKey)
  });

  useEffect(() => {
    if (userType === 'client') {
      setRoomId(clientRoomId || null);
    } else if (userType === 'host' && userId) {
      fetchSessionKey(userId);
    }
  }, [userType, clientRoomId, userId, fetchSessionKey]);

  if (!roomId) return <div>불러오는 중</div>;

  return <ChatSessionContext.Provider value={{ userType, roomId, userId }}>{children}</ChatSessionContext.Provider>;
};

export const useChatSessionContext = () => {
  const context = useContext(ChatSessionContext);
  if (!context) throw new Error('useChatSessionContext must be used within a ChatSessionProvider');
  return context;
};
