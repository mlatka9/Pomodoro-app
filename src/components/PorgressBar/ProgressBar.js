import { StyledCircle, SvgWrapper } from './ProgressBar.styles';
import PropTypes from 'prop-types';
import React from 'react';

const ProgressBar = React.memo(({ progress = 100 }) => {
  return (
    <SvgWrapper viewBox="0 0 36 36">
      <StyledCircle
        isFinish={progress === 0}
        strokeDasharray={`${progress}, 100`}
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
    </SvgWrapper>
  );
});

ProgressBar.propTypes = {
  progress: PropTypes.number,
};

export default ProgressBar;
