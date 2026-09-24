import React, { useEffect, useRef, useState } from "react";

const StudyTimer = () => {
  const STUDY_MINUTES = 25;
  const BREAK_MINUTES = 5;
  const TOTAL_CYCLES = 4;

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isBreakMode, setIsBreakMode] = useState(false);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [timeLeft, setTimeLeft] = useState(STUDY_MINUTES * 60);

  const endTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isTimerRunning) return;

    // Initialize endTimeRef if it's null
    if (endTimeRef.current === null) {
      endTimeRef.current = Date.now() + timeLeft * 1000;
    }

    const tick = () => {
      const secondsRemaining = Math.round(
        (endTimeRef.current! - Date.now()) / 1000,
      );

      if (secondsRemaining > 0) {
        setTimeLeft(secondsRemaining);
        return;
      }

      // Timer has reached zero (either study or break time)
      if (isBreakMode) {
        setIsBreakMode(false);
        setTimeLeft(STUDY_MINUTES * 60);
        endTimeRef.current = Date.now() + STUDY_MINUTES * 60 * 1000;
        return;
      }

      setCompletedCycles((cycleCount) => {
        const nextCycle = cycleCount + 1;

        if (nextCycle >= TOTAL_CYCLES) {
          setIsTimerRunning(false);
          setIsBreakMode(false);
          setTimeLeft(STUDY_MINUTES * 60);
          endTimeRef.current = null;
          return TOTAL_CYCLES;
        }

        setIsBreakMode(true);
        return nextCycle;
      });

      setTimeLeft(BREAK_MINUTES * 60);
      endTimeRef.current = Date.now() + BREAK_MINUTES * 60 * 1000;
    };

    // run once immediately in case a lot of time passed while paused/hidden,
    // then check every second (browser may throttle this in background tabs,
    // but the Date.now() math self-corrects once it fires again)
    tick();
    const timer = window.setInterval(tick, 1000);

    return () => window.clearInterval(timer);
  }, [isTimerRunning, isBreakMode]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleStartTimer = () => {
    if (completedCycles >= TOTAL_CYCLES) {
      setCompletedCycles(0);
      setIsBreakMode(false);
      setTimeLeft(STUDY_MINUTES * 60);
      endTimeRef.current = Date.now() + STUDY_MINUTES * 60 * 1000;
      setIsTimerRunning(true);
      return;
    }

    setIsTimerRunning((current) => {
      const next = !current;
      if (!next) {
        // If pausing, reset endTimeRef to null so it will be recalculated when resuming
        endTimeRef.current = null; // Reset endTimeRef when pausing
      }
      return next;
    });
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setIsBreakMode(false);
    setCompletedCycles(0);
    setTimeLeft(STUDY_MINUTES * 60);
    endTimeRef.current = null; // Reset endTimeRef when resetting
  };

  const timerLabel = isBreakMode ? "Break Time" : "Study Time";

  return (
    <>
      <div className="flex items-center justify-between">
        <span className={`text-xs uppercase tracking-[0.15em] `}>
          {timerLabel}
        </span>
        <span className={`text-xs uppercase tracking-[0.15em] `}>
          {completedCycles}/{TOTAL_CYCLES} cycles
        </span>
      </div>

      <div className={`mt-1 text-2xl font-semibold tabular-nums `}>
        {formatTime(timeLeft)}
      </div>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={handleStartTimer}
          className={`px-3 py-1 text-sm font-medium rounded-md cursor-pointer ${isTimerRunning ? "bg-red-500 text-white hover:bg-red-600" : "bg-green-500 text-white hover:bg-green-600"}`}
        >
          {isTimerRunning ? "Pause" : "Start"}
        </button>
        <button
          type="button"
          onClick={resetTimer}
          className="px-3 py-1 text-sm font-medium rounded-md cursor-pointer bg-gray-500 text-white hover:bg-gray-600"
        >
          Reset
        </button>
      </div>
    </>
  );
};

export default StudyTimer;
