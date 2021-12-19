import React, { useContext, useState, useRef, useEffect } from 'react';
import useGlobalSettings from './useGlobalSettings';
import RingSound from 'assets/sounds/ring-sound.wav';
import { formatTimer } from 'helpers';
import useMode from './useMode';
import useTimeStudiedToday from './useStudiedToday';

const TimerContext = React.createContext();

export const TimerProvider = ({ children }) => {
  const { globalSettings } = useGlobalSettings();
  const { mode } = useMode();
  const { updateTimeStudiedToday, studiedTodayCounter } = useTimeStudiedToday();
  const baseTimeInSeconds = mode === 'freeLearning' ? 0 : globalSettings.timerBase[mode] * 60;

  const [timerState, setTimerState] = useState('idle');
  const [timer, setTimer] = useState(0);
  let intervalId = useRef();

  const decrementTimer = () => setTimer((timer) => timer - 1);
  const incrementTimer = () => setTimer((timer) => timer + 1);

  useEffect(() => {
    setTimer(baseTimeInSeconds);
    setTimerState('idle');
  }, [mode, baseTimeInSeconds]);

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
      setTimer(baseTimeInSeconds);
      document.title = 'Pomodoro';
    } else if (timerState === 'counting') {
      document.title = formatTimer(timer);
      if (timer === 0 && mode !== 'freeLearning') {
        const audio = new Audio(RingSound);
        audio.play();
        setTimerState('finished');
        document.title = 'Session end';
        if (mode === 'pomodoro') {
          updateTimeStudiedToday(baseTimeInSeconds);
        }
      }
    }
  }, [timer, studiedTodayCounter.date, timerState, mode, baseTimeInSeconds, updateTimeStudiedToday]);

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

  const values = {
    timerState,
    timer,
    handleToggleTimer,
    handleResetTimer,
    handleEndSession,
    baseTimeInSeconds,
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
