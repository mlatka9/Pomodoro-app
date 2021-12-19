import React, { useContext, useState, useEffect, useCallback } from 'react';
import { getItemFromLocalStorage, setItemInLocalStorage } from 'helpers';

const StudiedTodayContext = React.createContext();

export const StudiedTodayProvider = ({ children }) => {
  const [studiedTodayCounter, setStudiedTodayCounter] = useState({ time: 0, date: new Date().toDateString() });

  useEffect(() => {
    const storedData = getItemFromLocalStorage('studiedToday');
    if (storedData && storedData.date === new Date().toDateString()) {
      setStudiedTodayCounter(storedData);
    }
  }, []);

  useEffect(() => {
    setItemInLocalStorage('studiedToday', studiedTodayCounter);
  }, [studiedTodayCounter]);

  const updateTimeStudiedToday = useCallback(
    (bonusTime) => {
      if (new Date().toDateString() === studiedTodayCounter.date) {
        setStudiedTodayCounter((prev) => ({ ...prev, time: prev.time + bonusTime }));
      } else {
        setStudiedTodayCounter(() => ({ time: bonusTime, date: new Date().toDateString() }));
      }
    },
    [studiedTodayCounter.date]
  );

  const values = { updateTimeStudiedToday, studiedTodayCounter };
  return <StudiedTodayContext.Provider value={values}>{children}</StudiedTodayContext.Provider>;
};

const useTimeStudiedToday = () => {
  const context = useContext(StudiedTodayContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a StudiedTodayContext');
  }
  return context;
};

export default useTimeStudiedToday;
