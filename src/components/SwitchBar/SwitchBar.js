import { Wrapper, SwitchOption } from './SwitchBar.styles';

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

export default SwitchBar;
