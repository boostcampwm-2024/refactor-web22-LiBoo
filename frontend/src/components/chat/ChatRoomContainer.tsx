import { ChatSessionProvider } from '@contexts/ChatSessionContext';
import ChatRoomLayout from './ChatRoomLayout';
import { ChatWorkerProvider } from '@contexts/ChatWorkerContext';
import { ChatProvider } from '@contexts/chatContext';

const ChatRoomContainer = ({ userType }: { userType: 'client' | 'host' }) => {
  return (
    <ChatSessionProvider userType={userType}>
      <ChatWorkerProvider>
        <ChatProvider>
          <ChatRoomLayout />
        </ChatProvider>
      </ChatWorkerProvider>
    </ChatSessionProvider>
  );
};

export default ChatRoomContainer;
