import styled from 'styled-components';
import { memo, useCallback, useEffect, useRef } from 'react';
import { useChatUIContext } from '@contexts/ChatUIContext';
import ThreePointIcon from '@assets/icons/three-point.svg';
import OutIcon from '@assets/icons/out.svg';
import LayerPopup from './LayerPopup';

interface ChatHeaderProps {
  outBtnHandler: () => void;
}

const MemoizedHeaderBtn = memo(({ onClick, icon }: { onClick: () => void; icon: string }) => (
  <HeaderBtn onClick={onClick}>
    <StyledIcon as={icon} />
  </HeaderBtn>
));

MemoizedHeaderBtn.displayName = 'MemoizedHeaderBtn';

export const ChatHeader = ({ outBtnHandler }: ChatHeaderProps) => {
  const { state, handlers } = useChatUIContext();
  const headerRef = useRef<HTMLDivElement>(null);

  const toggleSettings = useCallback(() => {
    handlers.toggleSettings();
  }, [handlers]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node) && state.isSettingsOpen)
        handlers.closeSettings();
    },
    [handlers, state.isSettingsOpen]
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <ChatHeaderContainer ref={headerRef}>
      <MemoizedHeaderBtn onClick={outBtnHandler} icon={OutIcon} />
      <h2>채팅</h2>
      <MemoizedHeaderBtn onClick={toggleSettings} icon={ThreePointIcon} />

      <PopupWrapper>{state.isSettingsOpen && <LayerPopup />}</PopupWrapper>
    </ChatHeaderContainer>
  );
};

export default ChatHeader;

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
