import React, { useEffect, useState } from 'react'

const StudyTimer = () => {
    const STUDY_MINUTES = 25;
    const BREAK_MINUTES = 5;
    const TOTAL_CYCLES = 4;

    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [isBreakMode, setIsBreakMode] = useState(false);
    const [completedCycles, setCompletedCycles] = useState(0);
    const [timeLeft, setTimeLeft] = useState(STUDY_MINUTES * 60);


    useEffect(() => {
        if (!isTimerRunning) return;

        const timer = window.setInterval(() => {
        setTimeLeft((currentTime) => {
            if (currentTime > 1) {
            return currentTime - 1;
            }

            if (isBreakMode) {
            setIsBreakMode(false);
            setTimeLeft(STUDY_MINUTES * 60);
            return STUDY_MINUTES * 60;
            }

            setCompletedCycles((cycleCount) => {
            const nextCycle = cycleCount + 1;

            if (nextCycle >= TOTAL_CYCLES) {
                setIsTimerRunning(false);
                setIsBreakMode(false);
                setTimeLeft(STUDY_MINUTES * 60);
                return TOTAL_CYCLES;
            }

            setIsBreakMode(true);
            return nextCycle;
            });

            setTimeLeft(BREAK_MINUTES * 60);
            return BREAK_MINUTES * 60;
        });
        }, 1000);

        return () => window.clearInterval(timer);
    }, [isBreakMode, isTimerRunning]);

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
        setIsTimerRunning(true);
        return;
        }

        setIsTimerRunning((current) => !current);
    };

    const resetTimer = () => {
        setIsTimerRunning(false);
        setIsBreakMode(false);
        setCompletedCycles(0);
        setTimeLeft(STUDY_MINUTES * 60);
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
          <button type="button" onClick={handleStartTimer} className={`px-3 py-1 text-sm font-medium rounded-md cursor-pointer ${isTimerRunning ? "bg-red-500 text-white hover:bg-red-600" : "bg-green-500 text-white hover:bg-green-600"}`}>
            {isTimerRunning ? "Pause" : "Start"}
          </button>
          <button type="button" onClick={resetTimer} className="px-3 py-1 text-sm font-medium rounded-md cursor-pointer bg-gray-500 text-white hover:bg-gray-600">
            Reset
          </button>
        </div>
      </>
  )
}

export default StudyTimer