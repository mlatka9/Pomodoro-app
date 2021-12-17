import styled, { keyframes } from 'styled-components';
import IconTik from 'assets/images/icon-tik.svg';

const slideIn = keyframes`
  0%{
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
    
  }50%{
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  } 
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
`;

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  width: 540px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  z-index: 100;
  border-radius: 25px;
  transform-origin: center bottom;
  animation: ${slideIn} 500ms ease-in;
  z-index: 1000;
  @media (max-width: 600px) {
    border-radius: 15px;
    width: 90%;
  }
`;

export const SettignsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 40px;
  border-bottom: 1px solid #e3e1e1;
  @media (max-width: 600px) {
    padding: 20px 30px;
  }
  span {
    font-family: ${({ theme }) => theme.fonts.mainFont};
    font-weight: bold;
    font-size: 28px;
    color: ${({ theme }) => theme.colors.black};
    @media (max-width: 600px) {
      font-size: 20px;
    }
  }
  button {
    padding: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;
    img {
      display: block;
    }
  }
`;

export const OptionsWrapper = styled.div`
  padding: 0 40px 35px;
  @media (max-width: 600px) {
    padding: 0 30px 35px;
  }
  > div {
    padding: 24px 0;
    @media (max-width: 600px) {
      padding: 20px 0;
    }
  }
  > div:nth-of-type(1) {
    border-bottom: 1px solid #e3e1e1;
    > div {
      display: flex;
      justify-content: space-between;
      @media (max-width: 600px) {
        flex-direction: column;
        align-items: center;
      }
      @media (max-width: 600px) {
        > div {
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: center;
          margin: 5px 0;
        }
      }
      span {
        display: block;
        margin: 24px 0 8px;
        font-family: ${({ theme }) => theme.fonts.mainFont};
        font-weight: bold;
        font-size: 12px;
        color: ${({ theme }) => theme.colors.black};
        opacity: 0.4;
        @media (max-width: 600px) {
          margin: 0;
        }
      }
    }
  }

  > div:nth-of-type(2) {
    border-bottom: 1px solid #e3e1e1;
    display: flex;
    justify-content: space-between;
    @media (max-width: 600px) {
      flex-direction: column;
      align-items: center;
      div {
        margin-top: 10px;
      }
    }
  }
  > div:nth-of-type(3) {
    display: flex;
    justify-content: flex-end;
    justify-content: space-between;
    @media (max-width: 600px) {
      flex-direction: column;
      align-items: center;
      div {
        margin-top: 10px;
      }
    }
  }
`;

export const FontButton = styled.button`
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 16px;
  background-color: ${({ theme, isSelected }) => (isSelected ? theme.colors.black : theme.colors.lightGrey)};
  color: ${({ theme, isSelected }) => (isSelected ? theme.colors.white : theme.colors.darkBlue)};
  cursor: pointer;
  font-family: ${({ font }) => font};
  font-weight: ${({ font }) => {
    if (font === 'Kumbh Sans' || font === 'Space Mono') {
      return 'bold';
    } else {
      return 'normal';
    }
  }};
  transition: box-shadow 100ms ease-in-out;
  &:hover {
    box-shadow: ${({ isSelected, theme }) =>
      isSelected
        ? 'none'
        : `inset 0px 0px 0px 1px ${theme.colors.lightGrey},
         inset 0px 0px 0px 4px rgba(255, 255, 255, 1)`};
  }
`;

export const ColorButton = styled.button`
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 16px;
  background: ${({ isSelected }) => (isSelected ? `center url(${IconTik}) no-repeat` : 'none')};
  background-color: ${({ color }) => color};
  cursor: pointer;
`;

export const OptionTitle = styled.span`
  font-family: ${({ theme }) => theme.fonts.mainFont};
  font-weight: bold;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.black};
  letter-spacing: 5px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  @media (max-width: 600px) {
    font-size: 11px;
  }
`;

export const ApplyButton = styled.button`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 50%);
  background-color: ${({ theme }) => theme.colors.red};
  border: none;
  width: 140px;
  height: 53px;
  border-radius: 26px;
  font-family: ${({ theme }) => theme.fonts.mainFont};
  font-weight: bold;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  transition: background-color 50ms ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.colors.lightRed};
  }
`;

const showModalBackground = keyframes`
  from {
    opacity: 0;
  }
`;

export const ModalBackground = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(22, 24, 43, 0.6);
  z-index: 500;
  animation: ${showModalBackground} 500ms linear;
`;
