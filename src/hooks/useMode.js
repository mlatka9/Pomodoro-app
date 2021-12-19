import React, { useContext, useState } from 'react';

const ModeContext = React.createContext();

export const ModeType = {
  POMODORO: 'pomodoro',
  FREE_LEARNING: 'freeLearning',
  SHORT_BREAK: 'shortBreak',
  LONG_BREAK: 'longBreak',
};

export const ModeProvider = ({ children }) => {
  const [mode, setMode] = useState(ModeType.POMODORO);

  const handleChangeMode = (mode) => {
    setMode(mode);
  };

  return (
    <ModeContext.Provider
      value={{
        mode,
        handleChangeMode,
      }}
    >
      {children}
    </ModeContext.Provider>
  );
};

const useMode = () => {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a ModeContext');
  }
  return context;
};

export default useMode;
