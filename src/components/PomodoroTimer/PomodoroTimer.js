import React from 'react';
import {
  Wrapper,
  TimerWrapper,
  TimerBorder,
  TimerInner,
  SettingsButton,
  ResetButton,
  ToggleButton,
} from './PomodoroTimer.styles';
import SwitchBar from 'components/SwitchBar/SwitchBar';
import ProgressBar from 'components/PorgressBar/ProgressBar';
import SettingsIcon from 'assets/images/settings-icon.svg';

import { formatTimer, formatTimerHourBase } from 'helpers';
import useGlobalSettings from 'hooks/useGlobalSettings';
import useTimer from 'hooks/useTimer';

const calculatePercentagePorgress = (leftTime, allTime) => (leftTime / allTime) * 100;

const PomodoroTimer = () => {
  const { setIsSettingsOpen } = useGlobalSettings();
  const { timer, studiedToday, toggleTimer, isStarted, isCounting, resetTimer, baseTimeInSeconds } = useTimer();

  const isFinished = timer === 0;

  return (
    <Wrapper>
      <h1>pomodoro</h1>
      <h2>Today You studied for {formatTimerHourBase(studiedToday.time)}</h2>

      <SwitchBar />
      <TimerWrapper>
        <TimerBorder>
          <TimerInner>
            <span>{formatTimer(timer)}</span>
            {isFinished ? null : (
              <ToggleButton onClick={toggleTimer}>
                {(() => {
                  if (!isStarted) return 'start';
                  else return isCounting ? 'pause' : 'resume';
                })()}
              </ToggleButton>
            )}
            {(!isCounting && isStarted) || isFinished ? (
              <ResetButton isFinished={isFinished} onClick={resetTimer}>
                Reset
              </ResetButton>
            ) : null}
          </TimerInner>
        </TimerBorder>
        <ProgressBar progress={calculatePercentagePorgress(timer, baseTimeInSeconds)} />
      </TimerWrapper>
      <SettingsButton onClick={() => setIsSettingsOpen(true)}>
        <img src={SettingsIcon} alt="settings" />
      </SettingsButton>
    </Wrapper>
  );
};

export default PomodoroTimer;
