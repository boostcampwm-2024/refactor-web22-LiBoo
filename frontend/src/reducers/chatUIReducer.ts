import { UserInfoData } from '@type/chat';

export type SettingOption = 'chat_notice' | 'ai_summary' | null;

export interface ChatUIState {
  isSettingsOpen: boolean;
  settingOption: SettingOption;
  isNoticePopupOpen: boolean;
  isUserInfoPopupOpen: boolean;
  selectedUser: UserInfoData | null;
}

export const initialState: ChatUIState = {
  isSettingsOpen: false,
  settingOption: null,
  isNoticePopupOpen: true,
  isUserInfoPopupOpen: false,
  selectedUser: null
};

export type ChatUIAction =
  | { type: 'TOGGLE_SETTINGS' }
  | { type: 'CLOSE_SETTINGS' }
  | { type: 'SET_SETTING'; payload: SettingOption }
  | { type: 'TOGGLE_NOTICE_POPUP' }
  | { type: 'CLOSE_USER_INFO_POPUP' }
  | {
      type: 'SET_SELECTED_USER';
      payload: UserInfoData | null;
    }
  | { type: 'CLOSE_ALL' };

export const chatUIReducer = (state: ChatUIState, action: ChatUIAction): ChatUIState => {
  switch (action.type) {
    case 'TOGGLE_SETTINGS':
      return { ...state, isSettingsOpen: !state.isSettingsOpen };

    case 'CLOSE_SETTINGS':
      return { ...state, isSettingsOpen: false };

    case 'SET_SETTING':
      return {
        ...state,
        settingOption: action.payload,
        isNoticePopupOpen: action.payload === 'chat_notice',
        isUserInfoPopupOpen: action.payload !== 'chat_notice' ? state.isUserInfoPopupOpen : false
      };

    case 'TOGGLE_NOTICE_POPUP':
      return { ...state, isUserInfoPopupOpen: false, isNoticePopupOpen: !state.isNoticePopupOpen };

    case 'CLOSE_USER_INFO_POPUP':
      return { ...state, isUserInfoPopupOpen: false };

    case 'SET_SELECTED_USER':
      return {
        ...state,
        selectedUser: action.payload,
        isNoticePopupOpen: false,
        isUserInfoPopupOpen: true
      };

    case 'CLOSE_ALL':
      return {
        isSettingsOpen: false,
        settingOption: null,
        isNoticePopupOpen: false,
        isUserInfoPopupOpen: false,
        selectedUser: null
      };

    default:
      return state;
  }
};
