import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { getCustomTheme } from 'styles/theme';
import { GlobalStyle } from 'styles/GlobalSyles';
import PomodoroTimer from 'components/PomodoroTimer/PomodoroTimer';
import SettingsModal from 'components/SettingsModal/SettingsModal';
import { getItemFromLocalStorage } from 'helpers';

const defaultSettings = {
  timerBase: {
    pomodoro: 30,
    shortBreak: 5,
    longBreak: 15,
  },
  font: 'Kumbh Sans',
  colorTheme: 'red',
};

const initialSettings = getItemFromLocalStorage('settings') || defaultSettings;

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [globalSettings, setGlobalSettings] = useState(initialSettings);

  const selectedTheme = getCustomTheme(globalSettings.font, globalSettings.colorTheme);

  return (
    <ThemeProvider theme={selectedTheme}>
      <GlobalStyle />
      <PomodoroTimer setIsSettingsOpen={setIsSettingsOpen} globalSettings={globalSettings} />
      {isSettingsOpen ? (
        <SettingsModal
          setIsSettingsOpen={setIsSettingsOpen}
          globalSettings={globalSettings}
          setGlobalSettings={setGlobalSettings}
        />
      ) : null}
    </ThemeProvider>
  );
}

export default App;
