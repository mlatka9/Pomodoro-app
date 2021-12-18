import { Wrapper, SwitchOption } from './SwitchBar.styles';
import useMode from 'hooks/useMode';
import React from 'react';

const SwitchBar = React.memo(() => {
  const { mode, handleChangeMode } = useMode();
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
});

export default SwitchBar;
