"use client";

import { useCreateNote } from "@/features/notes/hooks/useCreateNote";
import { useNotes } from "@/features/notes/hooks/useNotes";
import { useEffect, useState } from "react";
import NoteCard from "./components/NoteCard";
import { MoonLoader } from "react-spinners";
import Sidebar from "./components/Sidebar";

type NoteForm = {
  title: string;
  content: string;
};

const emptyForm = (): NoteForm => ({ title: "", content: "" });

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [form, setForm] = useState({ title: "", content: "" });
  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isPending, isError } = useCreateNote();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.title.trim() || !form.content.trim()) return;

    // 1. Submit payload to trigger the onMutate instant cache pipeline
    mutate(form);

    // 2. Clear local form inputs immediately
    setForm({ title: "", content: "" });
  };

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("notes-theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const initialTheme =
      savedTheme === "light" || savedTheme === "dark"
        ? savedTheme
        : prefersDark
          ? "dark"
          : "light";

    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    document.documentElement.style.colorScheme = theme;
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("notes-theme", theme);
  }, [theme]);

  // useEffect(() => {
  //   const savedNotes = window.localStorage.getItem("notes");
  //   if (savedNotes) {
  //     try {
  //       setNotes(JSON.parse(savedNotes));
  //     } catch {
  //       window.localStorage.removeItem("notes");
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   window.localStorage.setItem("notes", JSON.stringify(notes));
  // }, [notes]);

  const { data: notes, isLoading, error, isFetching } = useNotes();

  const isDark = theme === "dark";
  const shellClasses = isDark
    ? "min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-8"
    : "min-h-screen bg-slate-100 px-4 py-10 text-slate-900 sm:px-6 lg:px-8";
  const headerClasses = isDark
    ? "sticky top-4 z-20 rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur"
    : "sticky top-4 z-20 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 backdrop-blur";
  const formClasses = isDark
    ? "rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-xl shadow-black/20"
    : "rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60";
  const inputClasses = isDark
    ? "w-full rounded-2xl border border-white/10 bg-slate-800 px-4 py-3 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-cyan-400"
    : "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-cyan-500";
  const mutedTextClasses = isDark ? "text-slate-300" : "text-slate-600";
  const subtleTextClasses = isDark ? "text-slate-400" : "text-slate-500";
  const cardClasses = isDark
    ? "rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-lg shadow-black/20"
    : "rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/50";
  const emptyStateClasses = isDark
    ? "rounded-3xl border border-dashed border-white/15 bg-slate-900/50 p-8 text-center text-slate-400"
    : "rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500";
  const pillClasses = isDark
    ? "rounded-full border border-white/10 px-3 py-1 text-sm text-slate-300"
    : "rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600";
  const buttonClasses = isDark
    ? "rounded-full border border-white/15 px-3 py-1.5 text-sm text-slate-300 transition hover:bg-white/10 cursor-pointer"
    : "rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 transition hover:bg-slate-100 cursor-pointer";
  const actionButtonClasses = isDark
    ? "rounded-full border border-cyan-400/40 px-3 py-1 text-sm text-cyan-300 transition hover:bg-cyan-400/40 cursor-pointer"
    : "rounded-full border border-cyan-500/40 px-3 py-1 text-sm text-cyan-600 transition hover:bg-cyan-200 cursor-pointer";
  const deleteButtonClasses = isDark
    ? "rounded-full border border-rose-400/40 px-3 py-1 text-sm text-rose-300 transition hover:bg-rose-400/40 cursor-pointer"
    : "rounded-full border border-rose-500/40 px-3 py-1 text-sm text-rose-600 transition hover:bg-rose-200 cursor-pointer";

  return (
    <main className={shellClasses}>
      {/* <div className="flex mx-auto max-w-6xl gap-8"> */}
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className={`mx-auto flex flex-col gap-8 transition-all duration-200 max-w-6xl`}>
        <header className={headerClasses}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={`rounded-full px-4 py-2 text-sm font-medium cursor-pointer transition ${isDark ? "bg-white/15 text-slate-100 hover:bg-white/20" : "bg-slate-900 text-white hover:bg-slate-800"}`}
            >
              {isOpen ? "Close Sidebar" : "Open Sidebar"}
            </button>
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

            <button
              type="button"
              onClick={() =>
                setTheme((currentTheme) =>
                  currentTheme === "dark" ? "light" : "dark",
                )
              }
              className={`rounded-full px-4 py-2 text-sm font-medium cursor-pointer transition ${isDark ? "bg-white/15 text-slate-100 hover:bg-white/20" : "bg-slate-900 text-white hover:bg-slate-800"}`}
            >
              {isDark ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </header>

        <form onSubmit={handleSubmit} className={formClasses}>
          <div className="space-y-4">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Note title"
              className={inputClasses}
              disabled={isPending}
            />
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Write your note here..."
              rows={5}
              className={inputClasses}
              disabled={isPending}
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={isPending}
              className={actionButtonClasses}
            >
              {isPending ? "Saving note..." : "Save Note"}
            </button>
            {isError && (
              <p className="text-red-500 text-sm">Failed to save note.</p>
            )}
            <button
              type="button"
              onClick={() => setForm(emptyForm())}
              className={buttonClasses}
            >
              Clear
            </button>
          </div>
        </form>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your notes</h2>
            <span className={pillClasses}>
              {notes?.length} {notes?.length === 1 ? "note" : "notes"}
            </span>
          </div>

          {isFetching && (
            <div className="flex justify-center items-center p-6 gap-2">
              <MoonLoader color={isDark ? "#ffffff" : "#000000"} size={30} />
              <p className="text-gray-500">Loading...</p>
            </div>
          )}
          {error && (
            <div className="flex justify-center align-middle p-6">
              <p className="text-gray-500">
                Something went wrong! Please try again later.
              </p>
            </div>
          )}
          {notes?.length === 0 ? (
            <div className={emptyStateClasses}>
              No notes yet. Start by creating one.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {notes?.map((note) => {
                return (
                  <NoteCard
                    key={note.id}
                    note={note}
                    cardClasses={cardClasses}
                  />
                );
              })}
            </div>
          )}
        </section>
      </div>
      {/* </div> */}
    </main>
  );
}
