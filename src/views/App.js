import { ThemeProvider } from 'styled-components';
import { getCustomTheme } from 'styles/theme';
import { GlobalStyle } from 'styles/GlobalSyles';
import PomodoroTimer from 'components/PomodoroTimer/PomodoroTimer';
import SettingsModal from 'components/SettingsModal/SettingsModal';
import useGlobalSettings from 'hooks/useGlobalSettings';
import { TimerProvider } from 'hooks/useTimer';
import { ModeProvider } from 'hooks/useMode';
import React, { useState } from 'react';
import { StudyHistoryProvider } from 'hooks/useStudyHistory';
import HistoryModal from 'components/HistoryModal/HistoryModal';

const App = () => {
  const { globalSettings, isSettingsOpen } = useGlobalSettings();
  const [isHisotryOpen, setIsHisotryOpen] = useState();

  const handleOpenHistory = () => setIsHisotryOpen(true);
  const handleCloseHistory = () => setIsHisotryOpen(false);

  const selectedTheme = getCustomTheme(globalSettings.font, globalSettings.colorTheme);

  return (
    <ThemeProvider theme={selectedTheme}>
      <GlobalStyle />
      <ModeProvider>
        <StudyHistoryProvider>
          <TimerProvider>
            <PomodoroTimer handleOpenHistory={handleOpenHistory} />
          </TimerProvider>
          {isHisotryOpen ? <HistoryModal handleCloseHistory={handleCloseHistory} /> : null}
        </StudyHistoryProvider>
      </ModeProvider>
      {isSettingsOpen ? <SettingsModal /> : null}
    </ThemeProvider>
  );
};

export default App;
