"use client";

import React, { useEffect, useState } from "react";

interface ToolbarProps {
  sidebarIsOpen: boolean;
  isDark: boolean;
  onToggleSidebar: () => void;
  onToggleTheme: () => void;
  onNewNote: () => void;
  isNewNoteDisabled: boolean;
}

const STUDY_MINUTES = 25;
const BREAK_MINUTES = 5;
const TOTAL_CYCLES = 4;

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const Toolbar = ({
  sidebarIsOpen,
  isDark,
  onToggleSidebar,
  onToggleTheme,
  onNewNote,
  isNewNoteDisabled,
}: ToolbarProps) => {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isBreakMode, setIsBreakMode] = useState(false);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [timeLeft, setTimeLeft] = useState(STUDY_MINUTES * 60);

  const buttonClasses = `rounded-full px-4 py-2 text-sm text-white font-semibold cursor-pointer transition ${
    isDark
      ? "bg-cyan-500/70 hover:bg-cyan-500/80 text-white"
      : "bg-cyan-500 hover:bg-cyan-600 text-white"
  }`;
  const timerButtonClasses = `rounded-full px-4 py-2 text-sm text-white font-semibold cursor-pointer transition ${
    isDark
      ? "bg-purple-500/70 hover:bg-purple-500/80 text-white"
      : "bg-purple-500 hover:bg-purple-600 text-white"
  }`;

  const timerBadgeClasses = isDark
    ? "rounded-full border border-purple-400/40 bg-purple-500/10 px-3 py-2 text-sm text-purple-200"
    : "rounded-full border border-purple-500/30 bg-purple-100 px-3 py-2 text-sm text-purple-700";

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
      <div
        className={`flex flex-wrap items-center justify-between gap-4 rounded-2xl border px-4 py-3 ${isDark ? "border-white/15 dark:bg-white/10" : "border-gray-200 bg-white"}`}
      >
        <button
          type="button"
          onClick={onToggleSidebar}
          className={buttonClasses}
        >
          {sidebarIsOpen ? "Close Folders" : "Open Folders"}
        </button>

        {/* <div className="flex flex-wrap items-center gap-3">
          <div className={timerBadgeClasses}>
            <span className="font-semibold">
              {timerLabel}: {formatTime(timeLeft)}
            </span>
          </div>
          <span className="text-xs uppercase tracking-[0.2em] text-gray-500">
            {completedCycles}/{TOTAL_CYCLES} cycles
          </span>
        </div> */}

        <div className="flex items-center gap-4">
          {/* <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleStartTimer}
              className={timerButtonClasses}
            >
              {isTimerRunning ? "Pause Timer" : "Start Timer"}
            </button>
            <button
              type="button"
              onClick={resetTimer}
              className={timerButtonClasses}
            >
              Reset
            </button>
          </div> */}

          <div className="h-5 w-px bg-slate-300 dark:bg-white/20" />
          <button
            type="button"
            onClick={onNewNote}
            title={
              isNewNoteDisabled
                ? "Please select a folder first"
                : "Create a new note"
            }
            className={`${buttonClasses} ${isNewNoteDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isNewNoteDisabled}
          >
            + New Note
          </button>

          <div className="h-5 w-px bg-slate-300 dark:bg-white/20" />

          <button
            type="button"
            onClick={onToggleTheme}
            className={buttonClasses}
          >
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Toolbar