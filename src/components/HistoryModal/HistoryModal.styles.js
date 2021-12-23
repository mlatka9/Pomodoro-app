import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  0%{
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }
  1%{
    transform: translate(-50%, -50%) scale(0.5);
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
  width: 600px;
  height: 512px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  z-index: 100;
  border-radius: 25px;
  transform-origin: right top;
  animation: ${slideIn} 500ms ease-in;
  z-index: 1000;
  @media (max-width: 600px) {
    border-radius: 15px;
    width: 90%;
    height: unset;
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

export const ContentWrapper = styled.div`
  padding: 20px 40px 70px;
  h2 {
    font-family: ${({ theme }) => theme.fonts.mainFont};
    font-weight: bold;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.black};
    letter-spacing: 2px;
    text-transform: uppercase;
    display: blok;
    margin-bottom: 40px;
    text-align: center;
    span {
      color: ${({ theme }) => theme.colors.red};
    }
  }
`;
