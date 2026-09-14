import React from 'react'

const Header = ({ isDark }: { isDark: boolean }) => {
    const headerClasses = isDark
    ? "z-20 rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur"
    : "z-20 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 backdrop-blur";
    const mutedTextClasses = isDark ? "text-slate-300" : "text-slate-600";

  return (
    <header className={headerClasses}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-3">
              <p className="text-md font-semibold uppercase tracking-[0.3em] text-cyan-500">
                Knowledge Hub
              </p>
              <h1 className="text-3xl font-semibold sm:text-4xl">
                Create, edit, and organize your ideas.
              </h1>
              <p
                className={`max-w-2xl text-sm sm:text-base ${mutedTextClasses}`}
              >
                Add a quick thought, update it later, or remove it when it is no
                longer needed.
              </p>
            </div>
          </div>
        </header>
  )
}

export default Header