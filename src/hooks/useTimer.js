import React, { useContext, useState, useRef, useEffect } from 'react';
import useGlobalSettings from './useGlobalSettings';
import RingSound from 'assets/sounds/ring-sound.wav';
import { formatTimer } from 'helpers';
import useMode from './useMode';
import useStudyHistory from './useStudyHistory';

const TimerContext = React.createContext();

export const TimerProvider = ({ children }) => {
  const { globalSettings } = useGlobalSettings();
  const { mode } = useMode();
  const { updateTimeStudied } = useStudyHistory();
  const baseTimeInSeconds = mode === 'freeLearning' ? 0 : globalSettings.timerBase[mode] * 60;
  const timerWorker = useRef();
  // const renerCounter = useRef(0);

  // useEffect(() => {
  //   renerCounter.current++;
  //   console.log(renerCounter.current);
  // });

  const [timerState, setTimerState] = useState('idle');
  const [timer, setTimer] = useState(baseTimeInSeconds);

  useEffect(() => {
    timerWorker.current = new Worker('timerWorker.js');
    timerWorker.current.onmessage = function (e) {
      setTimer(e.data);
    };
    return () => timerWorker.current.terminate();
  }, []);

  useEffect(() => {
    setTimerState('idle');
    timerWorker.current.postMessage({ action: 'setup', value: baseTimeInSeconds });
    setTimer(baseTimeInSeconds); //to fix bug with switch bar before timer start
  }, [mode, baseTimeInSeconds]);

  useEffect(() => {
    if (timerState === 'counting') {
      if (mode === 'freeLearning') {
        timerWorker.current.postMessage({ action: 'start_incrementing' });
      } else {
        timerWorker.current.postMessage({ action: 'start_decrementing' });
      }
    } else {
      if (timerWorker.current) {
        timerWorker.current.postMessage({ action: 'cancel_timer' });
      }
    }

    return () => {
      timerWorker.current.postMessage({ action: 'cancel_timer' });
    };
  }, [timerState, mode]);

  useEffect(() => {
    if (timerState === 'idle') {
      timerWorker.current.postMessage({ action: 'setup', value: baseTimeInSeconds });
      document.title = 'Pomodoro';
    } else if (timerState === 'counting') {
      document.title = formatTimer(timer);
      if (timer === 0 && mode !== 'freeLearning') {
        const audio = new Audio(RingSound);
        audio.play();
        setTimerState('finished');
        document.title = 'Session end';
        if (mode === 'pomodoro') {
          updateTimeStudied(baseTimeInSeconds);
        }
      }
    }
  }, [timer, timerState, mode, baseTimeInSeconds, updateTimeStudied]);

  const handleToggleTimer = () => {
    if (timerState === 'idle' || timerState === 'paused') {
      setTimerState('counting');
    } else {
      setTimerState('paused');
    }
  };

  const handleEndSession = () => {
    updateTimeStudied(timer);
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
