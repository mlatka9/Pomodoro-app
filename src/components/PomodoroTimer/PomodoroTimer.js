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
import RingSound from 'assets/sounds/ring-sound.wav';
import { getItemFromLocalStorage, setItemInLocalStorage, formatTimer, formatTimerHourBase } from 'helpers';
import PropTypes from 'prop-types';
import { SettingsType } from 'types';

const calculatePercentagePorgress = (leftTime, allTime) => (leftTime / allTime) * 100;

const PomodoroTimer = ({ setIsSettingsOpen, globalSettings }) => {
  const [mode, setMode] = useState('pomodoro');
  const baseTimeInSeconds = globalSettings.timerBase[mode] * 60;
  const [timer, setTimer] = useState(baseTimeInSeconds);
  let intervalId = useRef();
  const [isCounting, setIsCounting] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [studiedToday, setStudiedToday] = useState({ time: 0, date: new Date().toDateString() });

  useEffect(() => {
    const storedData = getItemFromLocalStorage('studiedToday');
    if (storedData && storedData.date === new Date().toDateString()) {
      setStudiedToday(storedData);
    }
  }, []);

  useEffect(() => {
    setTimer(baseTimeInSeconds);
    setIsCounting(false);
    setIsStarted(false);
  }, [mode, baseTimeInSeconds]);

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

  useEffect(() => {
    setItemInLocalStorage('studiedToday', studiedToday);
  }, [studiedToday]);

  useEffect(() => {
    const updateTimeStudiedToday = (bonusTime) => {
      if (new Date().toDateString() === studiedToday.date) {
        setStudiedToday((prev) => ({ ...prev, time: prev.time + bonusTime }));
      } else {
        setStudiedToday(() => ({ time: bonusTime, date: new Date().toDateString() }));
      }
    };

    if (isStarted) {
      if (timer === 0) {
        document.title = 'Session end';
        const audio = new Audio(RingSound);
        audio.play();
        setIsCounting(false);
        updateTimeStudiedToday(baseTimeInSeconds);
      } else {
        document.title = formatTimer(timer);
      }
    } else {
      document.title = 'Pomodoro';
    }
  }, [isStarted, timer, baseTimeInSeconds, studiedToday.date]);

  const toggleTimer = () => {
    setIsCounting(!isCounting);
    setIsStarted(true);
  };

  const resetTimer = () => {
    setIsCounting(false);
    setTimer(baseTimeInSeconds);
    setIsStarted(false);
  };

  const handleChangeMode = (mode) => {
    setMode(mode);
  };

  const isFinished = timer === 0;

  return (
    <Wrapper>
      <h1>pomodoro</h1>
      <h2>Today You studied for {formatTimerHourBase(studiedToday.time)}</h2>
      <SwitchBar mode={mode} handleChangeMode={handleChangeMode} />
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

PomodoroTimer.propTypes = {
  globalSettings: PropTypes.shape(SettingsType).isRequired,
  setIsSettingsOpen: PropTypes.func.isRequired,
};

export default PomodoroTimer;
