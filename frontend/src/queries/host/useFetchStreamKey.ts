import { fetchStreamKey } from '@apis/host/fetchStreamKey';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

type StreamKeyResponse = {
  'stream-key': string;
  'session-key': string;
};

type Params = {
  onSuccess?: (data: StreamKeyResponse) => void;
  onError?: (error: Error) => void;
};

export default function useFetchStreamKey({ onSuccess, onError }: Params = {}): UseMutationResult<
  StreamKeyResponse,
  Error,
  string
> {
  return useMutation({
    mutationFn: fetchStreamKey,
    onSuccess,
    onError
  });
}