import styled from 'styled-components';

export const Wrapper = styled.div`
  width: fit-content;
  height: 48px;
  display: flex;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  border-radius: 10px;
  @media (max-width: 600px) {
    height: 40px;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-right: 10px;
    gap: 7px;
  }
  input {
    width: 110px;
    background-color: transparent;
    border: none;
    padding-left: 25px;
    color: ${({ theme }) => theme.colors.black};
    font-family: ${({ theme }) => theme.fonts.mainFont};
    font-size: 14px;
    font-weight: bold;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      /* display: none; <- Crashes Chrome on hover */
      -webkit-appearance: none;
      margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
    }

    &[type='number'] {
      -moz-appearance: textfield; /* Firefox */
    }
    &:focus {
      outline: none;
    }
  }
`;

export const InputButton = styled.button`
  display: block;
  background-color: transparent;
  border: none;
  width: 20px;
  height: 8px;
  padding: 0;
  cursor: pointer;
  font-size: 30px;
  svg {
    width: 100%;
    height: 100%;
    display: block;
    path {
      transition: stroke-opacity 150ms ease-in-out;
    }
  }
  &:hover path {
    stroke: ${({ theme }) => theme.colors.black};
    stroke-opacity: 1;
  }
`;
