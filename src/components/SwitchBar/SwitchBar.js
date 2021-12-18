import { Wrapper, SwitchOption } from './SwitchBar.styles';
import PropTypes from 'prop-types';

const SwitchBar = ({ mode, handleChangeMode }) => {
  return (
    <Wrapper mode={mode}>
      <SwitchOption isSelectedMode={mode === 'pomodoro'} onClick={() => handleChangeMode('pomodoro')}>
        pomodoro
      </SwitchOption>
      <SwitchOption isSelectedMode={mode === 'shortBreak'} onClick={() => handleChangeMode('shortBreak')}>
        short break
      </SwitchOption>
      <SwitchOption isSelectedMode={mode === 'longBreak'} onClick={() => handleChangeMode('longBreak')}>
        long break
      </SwitchOption>
    </Wrapper>
  );
};

SwitchBar.propTypes = {
  mode: PropTypes.oneOf(['pomodoro', 'shortBreak', 'longBreak']),
  handleChangeMode: PropTypes.func.isRequired,
};

export default SwitchBar;
