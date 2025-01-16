import { UserInfoData } from '@type/chat';
import { createContext, useReducer, ReactNode, useContext, useMemo } from 'react';
import {
  closeAll,
  closeSettings,
  closeUserInfoPopup,
  setSelectedUser,
  setSetting,
  toggleNoticePopup,
  toggleSettings
} from '@reducers/actionCreators';
import { chatUIReducer, ChatUIState, initialState, SettingOption } from '@reducers/chatUIReducer';

export const ChatUIContext = createContext<{
  state: ChatUIState;
  handlers: {
    toggleSettings: () => void;
    closeSettings: () => void;
    setSetting: (option: SettingOption) => void;
    toggleNoticePopup: () => void;
    closeUserInfoPopup: () => void;
    setSelectedUser: (user: UserInfoData | null) => void;
    closeAll: () => void;
  };
}>({
  state: initialState,
  handlers: {
    toggleSettings: () => {},
    closeSettings: () => {},
    setSetting: () => {},
    toggleNoticePopup: () => {},
    closeUserInfoPopup: () => {},
    setSelectedUser: () => {},
    closeAll: () => {}
  }
});

export const ChatUIProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(chatUIReducer, initialState);

  const handlers = useMemo(
    () => ({
      toggleSettings: () => dispatch(toggleSettings()),
      closeSettings: () => dispatch(closeSettings()),
      setSetting: (option: SettingOption) => dispatch(setSetting(option)),
      toggleNoticePopup: () => dispatch(toggleNoticePopup()),
      closeUserInfoPopup: () => dispatch(closeUserInfoPopup()),
      setSelectedUser: (user: UserInfoData | null) => dispatch(setSelectedUser(user)),
      closeAll: () => dispatch(closeAll())
    }),
    [dispatch]
  );

  return <ChatUIContext.Provider value={{ state, handlers }}>{children}</ChatUIContext.Provider>;
};

export const useChatUIContext = () => {
  const context = useContext(ChatUIContext);
  if (!context) {
    throw new Error('ChatUIContext Provider를 확인하세요!');
  }
  return context;
};
