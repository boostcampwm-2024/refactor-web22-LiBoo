import { createContext, useContext, useState, useEffect } from 'react';
import SharedWorker from '@utils/chatWorker?sharedworker';
import { CHATTING_SOCKET_DEFAULT_EVENT } from '@constants/chat';

interface ChatWorkerContextProps {
  worker: SharedWorker | null;
  joinRoom: (roomId: string, userId: string) => void;
  leaveRoom: () => void;
  sendMessage: (type: string, payload: any) => void;
}

const ChatWorkerContext = createContext<ChatWorkerContextProps | undefined>(undefined);

export const ChatWorkerProvider = ({ children }: { children: React.ReactNode }) => {
  const [worker, setWorker] = useState<SharedWorker | null>(null);

  useEffect(() => {
    const newWorker = new SharedWorker();
    setWorker(newWorker);
    newWorker.port.start();

    return () => {
      newWorker.port.close();
    };
  }, []);

  const joinRoom = (roomId: string, userId: string) => {
    if (!worker) return;
    worker.port.postMessage({
      type: CHATTING_SOCKET_DEFAULT_EVENT.JOIN_ROOM,
      payload: { roomId, userId }
    });
  };

  const leaveRoom = () => {
    if (worker) {
      worker.port.close();
      setWorker(null);
    }
  };

  const sendMessage = (type: string, payload: any) => {
    if (worker) {
      worker.port.postMessage({ type, payload });
    }
  };

  return (
    <ChatWorkerContext.Provider value={{ worker, joinRoom, leaveRoom, sendMessage }}>
      {children}
    </ChatWorkerContext.Provider>
  );
};

export const useChatWorkerContext = () => {
  const context = useContext(ChatWorkerContext);
  if (!context) throw new Error('useChatWorkerContext must be used within a ChatWorkerProvider');
  return context;
};
