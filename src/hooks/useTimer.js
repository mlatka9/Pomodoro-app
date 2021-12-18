import React, { useContext, useState, useRef, useEffect } from 'react';
import useGlobalSettings from './useGlobalSettings';
import RingSound from 'assets/sounds/ring-sound.wav';
import { getItemFromLocalStorage, setItemInLocalStorage, formatTimer } from 'helpers';
import useMode from './useMode';

const TimerContext = React.createContext();

export const TimerProvider = ({ children }) => {
  const { globalSettings } = useGlobalSettings();
  const { mode } = useMode();
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

  return (
    <TimerContext.Provider
      value={{
        timer,
        studiedToday,
        toggleTimer,
        isStarted,
        isCounting,
        resetTimer,
        baseTimeInSeconds,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

const useTimer = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
};

export default useTimer;
