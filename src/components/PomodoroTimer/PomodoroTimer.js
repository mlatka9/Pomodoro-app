import React from 'react';
import { Wrapper, TimerWrapper, TimerBorder, TimerInner, SettingsButton } from './PomodoroTimer.styles';
import SwitchBar from 'components/SwitchBar/SwitchBar';
import ProgressBar from 'components/PorgressBar/ProgressBar';
import SettingsIcon from 'assets/images/settings-icon.svg';

import { formatTimer, formatTimerHourBase } from 'helpers';
import useGlobalSettings from 'hooks/useGlobalSettings';
import useTimer from 'hooks/useTimer';
import useMode from 'hooks/useMode';
import useTimeStudiedToday from 'hooks/useStudiedToday';

const PomodoroTimer = () => {
  const { setIsSettingsOpen } = useGlobalSettings();
  const { studiedTodayCounter } = useTimeStudiedToday();
  const { timer, timerState, handleToggleTimer, handleResetTimer, handleEndSession, sessionPassedPercentage } =
    useTimer();
  const { mode } = useMode();

  const getMainButtonText = () => {
    if (timerState === 'idle') return 'start';
    if (timerState === 'counting') return 'pause';
    if (timerState === 'paused') return 'resume';
  };

  return (
    <Wrapper>
      <h1>pomodoro</h1>
      <h2>Today You studied for {formatTimerHourBase(studiedTodayCounter.time)}</h2>
      <SwitchBar />
      <TimerWrapper>
        <TimerBorder>
          <TimerInner>
            <span>{formatTimer(timer)}</span>
            {timerState !== 'finished' ? <button onClick={handleToggleTimer}>{getMainButtonText()}</button> : null}
            {timerState === 'paused' && mode === 'freeLearning' ? (
              <button onClick={handleEndSession}>{'End session'}</button>
            ) : null}
            {timerState === 'finished' || (timerState === 'paused' && mode !== 'freeLearning') ? (
              <button onClick={handleResetTimer}>{'Reset'}</button>
            ) : null}
          </TimerInner>
        </TimerBorder>
        <ProgressBar progress={sessionPassedPercentage} />
      </TimerWrapper>
      <SettingsButton onClick={() => setIsSettingsOpen(true)}>
        <img src={SettingsIcon} alt="settings" />
      </SettingsButton>
    </Wrapper>
  );
};

export default PomodoroTimer;
