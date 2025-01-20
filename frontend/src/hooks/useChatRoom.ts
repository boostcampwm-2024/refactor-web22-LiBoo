import { useState, useEffect } from 'react';
import { useChatWorkerContext } from '@contexts/ChatWorkerContext';
import { CHATTING_SOCKET_DEFAULT_EVENT, CHATTING_SOCKET_RECEIVE_EVENT } from '@constants/chat';
import { MessageReceiveData } from '@type/chat';

export const useChatRoom = (roomId: string, userId: string) => {
  const [messages, setMessages] = useState<MessageReceiveData[]>([]);
  const [questions, setQuestions] = useState<MessageReceiveData[]>([]);
  const { worker, joinRoom, leaveRoom } = useChatWorkerContext();

  useEffect(() => {
    if (!worker || !roomId || !userId) return;

    joinRoom(roomId, userId);

    worker.port.onmessage = (event) => {
      const { type, payload } = event.data;

      switch (type) {
        case CHATTING_SOCKET_RECEIVE_EVENT.INIT:
          setQuestions(payload.questionList);
          break;
        case CHATTING_SOCKET_RECEIVE_EVENT.NORMAL:
        case CHATTING_SOCKET_RECEIVE_EVENT.NOTICE:
          setMessages((prevMessages) => [...prevMessages, payload]);
          break;
        case CHATTING_SOCKET_RECEIVE_EVENT.QUESTION:
          setMessages((prevMessages) => [...prevMessages, payload]);
          setQuestions((prevQuestions) => [payload, ...prevQuestions]);
          break;
        case CHATTING_SOCKET_RECEIVE_EVENT.QUESTION_DONE:
          setQuestions((prevQuestions) => prevQuestions.filter((message) => message.questionId !== payload.questionId));
          break;
        case CHATTING_SOCKET_DEFAULT_EVENT.EXCEPTION:
          payload.msgType = 'exception';
          setMessages((prevMessages) => [...prevMessages, payload]);
          break;
        case 'logging':
          console.log(payload);
          break;
        default:
          break;
      }
    };

    return () => {
      leaveRoom();
    };
  }, [worker, roomId, userId, joinRoom, leaveRoom]);

  return { messages, questions };
};
