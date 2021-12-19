import React, { useContext, useState, useRef, useEffect } from 'react';
import useGlobalSettings from './useGlobalSettings';
import RingSound from 'assets/sounds/ring-sound.wav';
import { formatTimer } from 'helpers';
import useMode from './useMode';
import useTimeStudiedToday from './useStudiedToday';

const TimerContext = React.createContext();

const calculatePercentagePorgress = (leftTime, allTime) => {
  return (leftTime / allTime) * 100;
};

export const TimerProvider = ({ children }) => {
  const { globalSettings } = useGlobalSettings();
  const { mode } = useMode();
  const { updateTimeStudiedToday } = useTimeStudiedToday();
  const baseTime = mode === 'freeLearning' ? 0 : globalSettings.timerBase[mode] * 60;
  const [timerState, setTimerState] = useState('idle');
  const [timer, setTimer] = useState(baseTime);
  let intervalId = useRef();

  const decrementTimer = () => setTimer((timer) => timer - 1);
  const incrementTimer = () => setTimer((timer) => timer + 1);

  useEffect(() => {
    setTimer(baseTime);
    setTimerState('idle');
  }, [mode, baseTime]);

  useEffect(() => {
    if (timerState === 'counting') {
      if (mode === 'freeLearning') {
        intervalId.current = setInterval(incrementTimer, 1000);
      } else {
        intervalId.current = setInterval(decrementTimer, 1000);
      }
    } else {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    }
    return () => {
      clearInterval(intervalId.current);
    };
  }, [timerState, mode]);

  useEffect(() => {
    if (timerState === 'idle') {
      setTimer(baseTime);
      document.title = 'Pomodoro';
    } else if (timerState === 'counting') {
      document.title = formatTimer(timer);
      if (timer === 0 && mode !== 'freeLearning') {
        const audio = new Audio(RingSound);
        audio.play();
        setTimerState('finished');
        document.title = 'Session end';
        if (mode === 'pomodoro') {
          updateTimeStudiedToday(baseTime);
        }
      }
    }
  }, [timer, timerState, mode, baseTime, updateTimeStudiedToday]);

  const handleToggleTimer = () => {
    if (timerState === 'idle' || timerState === 'paused') {
      setTimerState('counting');
    } else {
      setTimerState('paused');
    }
  };

  const handleEndSession = () => {
    updateTimeStudiedToday(timer);
    setTimerState('idle');
  };

  const handleResetTimer = () => {
    setTimerState('idle');
  };

  const sessionPassedPercentage = mode === 'freeLearning' ? 100 : calculatePercentagePorgress(timer, baseTime);

  const values = {
    timerState,
    timer,
    handleToggleTimer,
    handleResetTimer,
    handleEndSession,
    sessionPassedPercentage,
  };
  return <TimerContext.Provider value={values}>{children}</TimerContext.Provider>;
};

const useTimer = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
};

export default useTimer;
