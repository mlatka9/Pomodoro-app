import React from 'react';
import { Wrapper, TimerWrapper, TimerBorder, TimerInner, SettingsButton, StatsWrapper } from './PomodoroTimer.styles';
import SwitchBar from 'components/SwitchBar/SwitchBar';
import ProgressBar from 'components/PorgressBar/ProgressBar';
import SettingsIcon from 'assets/images/settings-icon.svg';
import HistoryIcon from 'assets/images/icon-history.png';

import { formatTimer, formatTimerHourBase } from 'helpers';
import useGlobalSettings from 'hooks/useGlobalSettings';
import useTimer from 'hooks/useTimer';
import useMode from 'hooks/useMode';
import useTimeStudiedToday from 'hooks/useStudyHistory';

const calculatePercentagePorgress = (leftTime, allTime) => (leftTime / allTime) * 100;

const PomodoroTimer = ({ handleOpenHistory }) => {
  const { setIsSettingsOpen } = useGlobalSettings();
  const { timeStudiedToday } = useTimeStudiedToday();
  const { timer, timerState, handleToggleTimer, handleResetTimer, handleEndSession, baseTimeInSeconds } = useTimer();
  const { mode } = useMode();

  const getMainButtonText = () => {
    if (timerState === 'idle') return 'start';
    if (timerState === 'counting') return 'pause';
    if (timerState === 'paused') return 'resume';
  };

  return (
    <Wrapper>
      <h1>pomodoro</h1>
      <StatsWrapper>
        <h2>Today You studied for {formatTimerHourBase(timeStudiedToday)} </h2>
        <button onClick={handleOpenHistory}>
          <img src={HistoryIcon} alt="history" />
        </button>
      </StatsWrapper>

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
        <ProgressBar progress={mode === 'freeLearning' ? 100 : calculatePercentagePorgress(timer, baseTimeInSeconds)} />
      </TimerWrapper>
      <SettingsButton onClick={() => setIsSettingsOpen(true)}>
        <img src={SettingsIcon} alt="settings" />
      </SettingsButton>
    </Wrapper>
  );
};

export default PomodoroTimer;
