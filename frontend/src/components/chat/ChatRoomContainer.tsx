import ChatRoomView from './ChatRoomView';
import { ChatSessionProvider } from '@contexts/ChatSessionContext';
import { ChatWorkerProvider } from '@contexts/ChatWorkerContext';
import { ChatUIProvider } from '@contexts/ChatUIContext';

const ChatRoomContainer = ({ userType }: { userType: 'client' | 'host' }) => {
  return (
    <ChatSessionProvider userType={userType}>
      <ChatWorkerProvider>
        <ChatUIProvider>
          <ChatRoomView />
        </ChatUIProvider>
      </ChatWorkerProvider>
    </ChatSessionProvider>
  );
};

export default ChatRoomContainer;
