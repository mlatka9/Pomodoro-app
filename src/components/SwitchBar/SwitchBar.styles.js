import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 480px;
  height: 63px;
  display: flex;
  border-radius: 32px;
  padding: 8px;
  position: relative;
  background-color: ${({ theme }) => theme.colors.black};
  z-index: 0;
  z-index: 100;
  @media (max-width: 600px) {
    width: 410px;
  }
  &::after {
    content: '';
    display: block;
    position: absolute;
    height: 47px;
    width: 116px;
    background-color: ${({ theme }) => theme.colors.red};
    z-index: -10;
    border-radius: 26px;
    transition: transform 200ms ease-in-out;
    transform: translateX(
      ${({ mode }) => {
        if (mode === 'freeLearning') {
          return '100%';
        }
        if (mode === 'shortBreak') {
          return '200%';
        }
        if (mode === 'longBreak') {
          return '300%';
        }
      }}
    );
    @media (max-width: 600px) {
      width: 98px;
    }
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
