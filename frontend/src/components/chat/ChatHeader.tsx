import styled from 'styled-components';
import ThreePointIcon from '@assets/icons/three-point.svg';
import OutIcon from '@assets/icons/out.svg';
import { memo, useCallback, useContext, useEffect, useRef } from 'react';
import LayerPopup from './LayerPopup';
import { ChatContext } from 'src/contexts/chatContext';

interface ChatHeaderProps {
  outBtnHandler?: () => void;
}

export const ChatHeader = ({ outBtnHandler }: ChatHeaderProps) => {
  const { state, dispatch } = useContext(ChatContext);
  const headerRef = useRef<HTMLDivElement>(null);

  const toggleSettings = () => {
    dispatch({ type: 'TOGGLE_SETTINGS' });
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node) && state.isSettingsOpen) {
        dispatch({ type: 'CLOSE_SETTINGS' });
      }
    },
    [dispatch, state.isSettingsOpen]
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <ChatHeaderContainer ref={headerRef}>
      <HeaderBtn onClick={outBtnHandler}>
        <StyledIcon as={OutIcon} />
      </HeaderBtn>
      <h2>채팅</h2>
      <HeaderBtn onClick={toggleSettings}>
        <StyledIcon as={ThreePointIcon} />
      </HeaderBtn>
      <PopupWrapper>{state.isSettingsOpen && <LayerPopup />}</PopupWrapper>
    </ChatHeaderContainer>
  );
};

export default memo(ChatHeader);

const ChatHeaderContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
  border-top: 1px solid ${({ theme }) => theme.tokenColors['surface-alt']};
  color: ${({ theme }) => theme.tokenColors['color-white']};
  ${({ theme }) => theme.tokenTypographys['display-bold16']};
`;

const HeaderBtn = styled.button`
  display: flex;
  color: ${({ theme }) => theme.tokenColors['text-bold']};
  cursor: pointer;
`;

const StyledIcon = styled.svg`
  width: 22px;
  height: 22px;
  cursor: pointer;
`;

const PopupWrapper = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  z-index: 1000;
`;
