import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 375px;
  height: 63px;
  display: flex;
  border-radius: 32px;
  padding: 8px;
  position: relative;
  background-color: ${({ theme }) => theme.colors.black};
  z-index: 0;
  z-index: 100;
  &::after {
    content: '';
    display: block;
    position: absolute;
    height: 47px;
    width: 120px;
    background-color: ${({ theme }) => theme.colors.red};
    z-index: -10;
    border-radius: 26px;
    transition: transform 200ms ease-in-out;
    transform: translateX(
      ${({ mode }) => {
        if (mode === 'shortBreak') {
          return '100%';
        }
        if (mode === 'longBreak') {
          return '200%';
        }
      }}
    );
  }
`;

export const SwitchOption = styled.button`
  display: block;
  height: 100%;
  width: 33.3%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.mainFont};
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme, isSelectedMode }) => (isSelectedMode ? theme.colors.black : theme.colors.grey)};
  opacity: ${({ isSelectedMode }) => (isSelectedMode ? 1 : 0.4)};
  transition: color 100ms ease-in-out, opacity 100ms ease-in-out;
  letter-spacing: 0.7px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  z-index: 10;
  &:hover {
    opacity: 1;
  }
`;
