import React from 'react'

interface ToolbarProps {
  isOpen: boolean;
  isDark: boolean;
  onToggleSidebar: () => void;
  onToggleTheme: () => void;
}

const Toolbar = ({
  isOpen,
  isDark,
  onToggleSidebar,
  onToggleTheme
} : ToolbarProps) => {
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <button type="button" onClick={onToggleSidebar}
        className={`rounded-full px-4 py-2 text-sm font-medium cursor-pointer transition ${isDark ? "bg-white/15 text-slate-100 hover:bg-white/20" : "bg-slate-900 text-white hover:bg-slate-800"}`}
        >
          {isOpen ? 'Hide Folders' : 'Show Folders'}
        </button>
        <button type="button" onClick={onToggleTheme}
        className={`rounded-full px-4 py-2 text-sm font-medium cursor-pointer transition ${isDark ? "bg-white/15 text-slate-100 hover:bg-white/20" : "bg-slate-900 text-white hover:bg-slate-800"}`}>
          {isDark ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </>
  );
};
export default Toolbar