import styled from 'styled-components';

const Circle = styled.path`
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

const ProgressBar = ({ progress = 100 }) => {
  return (
    <SvgWrapper viewBox="0 0 36 36">
      <Circle
        isFinish={progress === 0}
        strokeDasharray={`${progress}, 100`}
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
    </SvgWrapper>
  );
};

export default ProgressBar;
