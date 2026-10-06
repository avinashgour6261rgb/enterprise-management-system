import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const { addToast } = useToast();
  
  // 2 hours, 16 mins, 5 seconds default based on screenshot
  const [seconds, setSeconds] = useState(() => {
    const saved = localStorage.getItem('hrms_work_clock_seconds');
    return saved ? parseInt(saved, 10) : 8165; 
  });
  
  const [isRunning, setIsRunning] = useState(() => {
    const saved = localStorage.getItem('hrms_work_clock_running');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [isClockedIn, setIsClockedIn] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isRunning && isClockedIn) {
      interval = setInterval(() => {
        setSeconds(prev => {
          const next = prev + 1;
          localStorage.setItem('hrms_work_clock_seconds', next.toString());
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isClockedIn]);

  useEffect(() => {
    localStorage.setItem('hrms_work_clock_running', JSON.stringify(isRunning));
  }, [isRunning]);

  const togglePauseResume = () => {
    setIsRunning(prev => {
      const next = !prev;
      addToast(next ? 'Timer resumed (Work in progress)' : 'Timer paused (On break)', 'info');
      return next;
    });
  };

  const handleClockOut = () => {
    if (!isClockedIn) {
      setIsClockedIn(true);
      setIsRunning(true);
      addToast('Clocked in successfully! Have a productive day.', 'success');
      return;
    }
    setIsRunning(false);
    setIsClockedIn(false);
    addToast('Clocked out successfully for today!', 'info');
  };

  const formatTime = (totalSecs) => {
    const hrs = String(Math.floor(totalSecs / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSecs % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSecs % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <TimerContext.Provider value={{
      seconds,
      isRunning,
      isClockedIn,
      timeString: formatTime(seconds),
      togglePauseResume,
      handleClockOut
    }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);
