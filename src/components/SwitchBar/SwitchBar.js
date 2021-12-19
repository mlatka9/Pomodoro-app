import { Wrapper, SwitchOption } from './SwitchBar.styles';
import useMode, { ModeType } from 'hooks/useMode';
import React from 'react';

const SwitchBar = React.memo(() => {
  const { mode, handleChangeMode } = useMode();
  return (
    <Wrapper mode={mode}>
      <SwitchOption isSelectedMode={mode === ModeType.POMODORO} onClick={() => handleChangeMode(ModeType.POMODORO)}>
        pomodoro
      </SwitchOption>
      <SwitchOption
        isSelectedMode={mode === ModeType.FREE_LEARNING}
        onClick={() => handleChangeMode(ModeType.FREE_LEARNING)}
      >
        Free learning
      </SwitchOption>
      <SwitchOption
        isSelectedMode={mode === ModeType.SHORT_BREAK}
        onClick={() => handleChangeMode(ModeType.SHORT_BREAK)}
      >
        short break
      </SwitchOption>
      <SwitchOption isSelectedMode={mode === ModeType.LONG_BREAK} onClick={() => handleChangeMode(ModeType.LONG_BREAK)}>
        long break
      </SwitchOption>
    </Wrapper>
  );
});

export default SwitchBar;
