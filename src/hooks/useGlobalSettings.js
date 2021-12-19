import React, { useContext, useState } from 'react';
import { getItemFromLocalStorage } from 'helpers';

const defaultSettings = {
  timerBase: {
    pomodoro: 20,
    shortBreak: 5,
    longBreak: 15,
  },
  font: 'Kumbh Sans',
  colorTheme: 'red',
};

const GlobalSettingsContext = React.createContext();

const initialSettings = getItemFromLocalStorage('settings') || defaultSettings;

export const GlobalSettingsProvider = ({ children }) => {
  const [globalSettings, setGlobalSettings] = useState(initialSettings);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <GlobalSettingsContext.Provider value={{ globalSettings, setGlobalSettings, isSettingsOpen, setIsSettingsOpen }}>
      {children}
    </GlobalSettingsContext.Provider>
  );
};

const useGlobalSettings = () => {
  const context = useContext(GlobalSettingsContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
};

export default useGlobalSettings;
