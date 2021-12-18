import styled from 'styled-components';

export const StyledCircle = styled.path`
  fill: none;
  stroke-width: 1;
  ${({ isFinish }) => !isFinish && 'stroke-linecap: round;'}
  stroke: ${({ theme }) => theme.colors.red};
  transition: stroke-dasharray 1s linear;
`;
export const SvgWrapper = styled.svg`
  display: block;
  height: calc(100% - 18px * 2);
  width: calc(100% - 18px * 2);
`;
