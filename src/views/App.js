import { ThemeProvider } from 'styled-components';
import { getCustomTheme } from 'styles/theme';
import { GlobalStyle } from 'styles/GlobalSyles';
import PomodoroTimer from 'components/PomodoroTimer/PomodoroTimer';
import SettingsModal from 'components/SettingsModal/SettingsModal';
import useGlobalSettings from 'hooks/useGlobalSettings';
import { TimerProvider } from 'hooks/useTimer';
import { ModeProvider } from 'hooks/useMode';
import React from 'react';

const App = () => {
  const { globalSettings, isSettingsOpen } = useGlobalSettings();

  const selectedTheme = getCustomTheme(globalSettings.font, globalSettings.colorTheme);

  return (
    <ThemeProvider theme={selectedTheme}>
      <GlobalStyle />
      <ModeProvider>
        <TimerProvider>
          <PomodoroTimer />
        </TimerProvider>
      </ModeProvider>
      {isSettingsOpen ? <SettingsModal /> : null}
    </ThemeProvider>
  );
};

export default App;
