import styled from 'styled-components';
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  h1 {
    font-family: ${({ theme }) => theme.fonts.mainFont};
    font-size: 32px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.grey};
    margin: 50px 0;
    @media (max-width: 600px) {
      margin: 30px 0;
    }
  }
  h2 {
    font-family: ${({ theme }) => theme.fonts.mainFont};
    font-size: 16px;
    letter-spacing: 1px;
    opacity: 0.8;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.grey};
    margin-bottom: 40px;
    text-align: center;
  }
`;

export const SettingsButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  z-index: 100;
  opacity: 0.6;
  transition: opacity 100ms ease-in-out, transform 150ms ease-in-out;
  &:hover {
    opacity: 1;
    transform: scale(1.1) rotate(25deg);
  }
`;

export const TimerWrapper = styled.div`
  width: 410px;
  height: 410px;
  margin: 70px auto;
  position: relative;
  border-radius: 50%;
  box-shadow: 38px 34px 51px 11px ${({ theme }) => theme.colors.black}, -38px -34px 51px 11px #272c5a;
  @media (max-width: 600px) {
    width: 350px;
    height: 350px;
    margin: 40px auto;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const TimerBorder = styled.div`
  height: 100%;
  width: 100%;
  background: rgb(14, 17, 42);
  background: linear-gradient(133deg, rgba(14, 17, 42, 1) 21%, rgba(46, 50, 90, 1) 80%);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;

export const TimerInner = styled.div`
  height: calc(100% - 22px * 2);
  width: calc(100% - 22px * 2);

  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.black};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    position: absolute;
    top: 32%;
    color: ${({ theme }) => theme.colors.white};
    font-size: 90px;
    font-family: ${({ theme }) => theme.fonts.mainFont};
    font-weight: bold;
    letter-spacing: 4px;
    @media (max-width: 600px) {
      font-size: 70px;
    }
  }
  button {
    letter-spacing: 15px;
    border: none;
    background-color: transparent;
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;
    z-index: 10;
    margin-top: 20px;
    margin-left: 10px;
  }
  button:nth-of-type(1) {
    font-size: 15px;
    position: absolute;
    top: 57%;
  }
  button:nth-of-type(2) {
    position: absolute;
    top: 66%;
    font-size: 12px;
    opacity: 0.8;
    letter-spacing: 10px;
  }
`;
