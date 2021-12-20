import React, { useContext, useState, useEffect } from 'react';
import { getItemFromLocalStorage, setItemInLocalStorage } from 'helpers';

const StudyHistoryContext = React.createContext();

export const StudyHistoryProvider = ({ children }) => {
  const [studyHistory, setStudyHistory] = useState([]);

  useEffect(() => {
    const storedData = getItemFromLocalStorage('studyHistory');
    if (storedData) {
      setStudyHistory(storedData);
    }
  }, []);

  useEffect(() => {
    setItemInLocalStorage('studyHistory', studyHistory);
  }, [studyHistory]);

  const updateTimeStudied = (bonusTime) => {
    const isTimeRecordedToday = studyHistory.some((record) => record.date === new Date().toISOString().split('T')[0]);
    if (isTimeRecordedToday) {
      setStudyHistory(
        studyHistory.map((record) => {
          if (record.date === new Date().toISOString().split('T')[0]) {
            return { date: record.date, time: record.time + bonusTime };
          } else {
            return record;
          }
        })
      );
    } else {
      setStudyHistory([...studyHistory, { date: new Date().toISOString().split('T')[0], time: bonusTime }]);
    }
  };

  const timeStudiedToday =
    studyHistory.find((record) => record.date === new Date().toISOString().split('T')[0])?.time || 0;

  const values = { updateTimeStudied, studyHistory, timeStudiedToday };
  return <StudyHistoryContext.Provider value={values}>{children}</StudyHistoryContext.Provider>;
};

const useStudyHistory = () => {
  const context = useContext(StudyHistoryContext);
  if (context === undefined) {
    throw new Error('useStudyHistory must be used within a StudiedTodayContext');
  }
  return context;
};

export default useStudyHistory;
