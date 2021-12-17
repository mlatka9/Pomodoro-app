import React, { useState, useRef, useEffect } from 'react';
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

const formatTimer = (leftSeconds) => {
  const seconds = leftSeconds % 60;
  const minutes = Math.floor(leftSeconds / 60);
  const minutesString = minutes > 9 ? minutes : `0${minutes}`;
  const secondsString = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutesString}:${secondsString}`;
};

const calculatePorgress = (leftTime, allTime) => (leftTime / allTime) * 100;

const PomodoroTimer = ({ setIsSettingsOpen, globalSettings }) => {
  const [mode, setMode] = useState('pomodoro');
  const baseTimeInSeconds = globalSettings.timerBase[mode] * 60;
  const [timer, setTimer] = useState(baseTimeInSeconds);
  let intervalId = useRef();
  const [isCounting, setIsCounting] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const toggleTimer = () => {
    setIsCounting(!isCounting);
    setIsStarted(true);
  };

  const resetTimer = () => {
    setIsCounting(false);
    setTimer(baseTimeInSeconds);
    setIsStarted(false);
  };

  useEffect(() => {
    setTimer(baseTimeInSeconds);
    setIsCounting(false);
    setIsStarted(false);
  }, [mode, baseTimeInSeconds]);

  useEffect(() => {
    if (timer === 0) {
      setIsCounting(false);
    }
  }, [timer]);

  useEffect(() => {
    if (isCounting) {
      intervalId.current = setInterval(() => setTimer((time) => time - 1), 1000);
    } else {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    }
    return () => {
      clearInterval(intervalId.current);
    };
  }, [isCounting]);

  const handleChangeMode = (mode) => {
    setMode(mode);
  };

  useEffect(() => {
    if (isStarted) {
      if (timer === 0) {
        document.title = 'Session end';
      } else {
        document.title = formatTimer(timer);
      }
    } else {
      document.title = 'Pomodoro';
    }
  }, [isStarted, timer]);

  const isFinished = timer === 0;

  return (
    <Wrapper>
      <h1>pomodoro</h1>
      <SwitchBar mode={mode} handleChangeMode={handleChangeMode} />
      <TimerWrapper>
        <TimerBorder>
          <TimerInner>
            <span>{formatTimer(timer)}</span>
            {!isFinished ? (
              <ToggleButton onClick={toggleTimer}>
                {(() => {
                  if (!isStarted) return 'start';
                  else return isCounting ? 'pause' : 'resume';
                })()}
              </ToggleButton>
            ) : null}
            {(!isCounting && isStarted) || isFinished ? (
              <ResetButton isFinished={isFinished} onClick={resetTimer}>
                Reset
              </ResetButton>
            ) : null}
          </TimerInner>
        </TimerBorder>
        <ProgressBar progress={calculatePorgress(timer, baseTimeInSeconds)} />
      </TimerWrapper>

      <SettingsButton onClick={() => setIsSettingsOpen(true)}>
        <img src={SettingsIcon} alt="settings" />
      </SettingsButton>
    </Wrapper>
  );
};

export default PomodoroTimer;
