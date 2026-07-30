"use client";

import { useCreateNote } from "@/features/notes/hooks/useCreateNote";
import { useDeleteNote } from "@/features/notes/hooks/useDeleteNote";
import { useNotes } from "@/features/notes/hooks/useNotes";
import { useEffect, useState } from "react";

type Note = {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
};

type NoteForm = {
  title: string;
  content: string;
};

const emptyForm = (): NoteForm => ({ title: "", content: "" });

export default function Home() {
  // const [notes, setNotes] = useState<Note[]>([]);
  // const [form, setForm] = useState<NoteForm>(emptyForm());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [form, setForm] = useState({ title: "", content: "" });

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
  };;

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
  const { mutate: deleteNote } = useDeleteNote();

  if (isLoading) {
    return (
      <div className="flex justify-center align-middle p-6">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <p>Something went wrong.</p>;
  }

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   if (!form.title.trim() && !form.content.trim()) {
  //     return;
  //   }

  //   const now = new Date().toISOString();

  //   // if (editingId) {
  //   //   setNotes((currentNotes) =>
  //   //     currentNotes.map((note) =>
  //   //       note.id === editingId
  //   //         ? {
  //   //             ...note,
  //   //             title: form.title.trim(),
  //   //             content: form.content.trim(),
  //   //             updatedAt: now,
  //   //           }
  //   //         : note,
  //   //     ),
  //   //   );
  //   // } else {
  //   //   const newNote: Note = {
  //   //     id: crypto.randomUUID(),
  //   //     title: form.title.trim(),
  //   //     content: form.content.trim(),
  //   //     updatedAt: now,
  //   //   };

  //   //   setNotes((currentNotes) => [newNote, ...currentNotes]);
  //   // }

  //   setForm(emptyForm());
  //   setEditingId(null);
  // };

  const startEditing = (note: Note) => {
    setEditingId(note.id);
    setForm({ title: note.title, content: note.content });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setForm(emptyForm());
  };

  // const deleteNote = (noteId: string) => {
  //   setNotes((currentNotes) =>
  //     currentNotes.filter((note) => note.id !== noteId),
  //   );

  //   if (editingId === noteId) {
  //     cancelEditing();
  //   }
  // };

  const isDark = theme === "dark";
  const shellClasses = isDark
    ? "min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-8"
    : "min-h-screen bg-slate-100 px-4 py-10 text-slate-900 sm:px-6 lg:px-8";
  const headerClasses = isDark
    ? "rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur"
    : "rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 backdrop-blur";
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
    ? "rounded-full border border-cyan-400/40 px-3 py-1 text-sm text-cyan-300 transition hover:bg-cyan-400/10"
    : "rounded-full border border-cyan-500/40 px-3 py-1 text-sm text-cyan-600 transition hover:bg-cyan-50";
  const deleteButtonClasses = isDark
    ? "rounded-full border border-rose-400/40 px-3 py-1 text-sm text-rose-300 transition hover:bg-rose-400/10"
    : "rounded-full border border-rose-500/40 px-3 py-1 text-sm text-rose-600 transition hover:bg-rose-50";

  return (
    <main className={shellClasses}>
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <header className={headerClasses}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-500">
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
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold">
              {editingId ? "Edit note" : "New note"}
            </h2>
            {editingId ? (
              <button
                type="button"
                onClick={cancelEditing}
                className={buttonClasses}
              >
                Cancel
              </button>
            ) : null}
          </div>

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
              className={`rounded-full px-4 py-2 text-sm cursor-pointer font-semibold transition ${isDark ? "bg-cyan-500 text-slate-950 hover:bg-cyan-400" : "bg-cyan-600 text-white hover:bg-cyan-500"}`}
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

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your notes</h2>
            {isFetching && (
              <span className="text-md text-gray-400 animate-pulse">
                (Refreshing...)
              </span>
            )}
            <span className={pillClasses}>
              {notes?.length} {notes?.length === 1 ? "note" : "notes"}
            </span>
          </div>

          {notes?.map((note) => {
            const isOptimistic = note.id.startsWith("temp-");
            return (
              <div
                key={note.id}
                className={`border rounded-lg p-4 mb-4 ${
                  isOptimistic
                    ? "opacity-50 border-dashed border-blue-400"
                    : "opacity-100"
                }`}
              >
                <div className="flex flex-row justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      {isOptimistic && (
                        <p className="text-md text-blue-400 font-medium">
                          Saving note...
                        </p>
                      )}
                    </div>
                    <h2 className="font-semibold">{note.title}</h2>
                    <p>{note.content}</p>
                  </div>
                  <button
                    onClick={() => deleteNote(note.id)}
                    disabled={isOptimistic} // prevent deleting an item that hasn't saved yet
                    className="mt-4 text-xs font-medium text-red-600 hover:text-red-800 cursor-pointer disabled:text-gray-300"
                  >
                    Delete Note
                  </button>
                </div>
              </div>
            );
          })}
          {/* {notes.length === 0 ? (
            <div className={emptyStateClasses}>
              No notes yet. Start by creating one.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {notes.map((note: Note) => (
                <article key={note.id} className={cardClasses}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {note.title || "Untitled note"}
                      </h3>
                      <p
                        className={`mt-1 text-xs uppercase tracking-[0.25em] ${subtleTextClasses}`}
                      >
                        {new Date(note.updatedAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => startEditing(note)}
                        className={actionButtonClasses}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        // onClick={() => deleteNote(note.id)}
                        className={deleteButtonClasses}
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <p
                    className={`mt-4 whitespace-pre-wrap text-sm leading-7 ${mutedTextClasses}`}
                  >
                    {note.content || "No content yet."}
                  </p>
                </article>
              ))}
            </div>
          )} */}
        </section>
      </div>
    </main>
  );
}
