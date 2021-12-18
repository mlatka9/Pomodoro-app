import React, { useContext, useState } from 'react';

const ModeContext = React.createContext();

export const ModeProvider = ({ children }) => {
  const [mode, setMode] = useState('pomodoro');

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
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
};

export default useMode;
