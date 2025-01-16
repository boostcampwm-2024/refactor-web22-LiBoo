import { useQuery } from '@tanstack/react-query';
import { ChatRuleResponse, fetchChatRule } from '@apis/fetchChatRule';

export const useFetchChatRule = ({ roomId }: { roomId: string }) => {
  return useQuery<ChatRuleResponse, Error>({
    queryKey: ['chatRule'],
    queryFn: () => fetchChatRule({ sessionKey: roomId }),
    refetchOnWindowFocus: false
  });
};
