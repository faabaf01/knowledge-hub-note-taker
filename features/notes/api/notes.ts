import { CreateNoteInput, Note } from "../types";

let fakeNotes: Note[] = [
  {
    id: "1",
    title: "React Query",
    content: "Learning React Query today.",
    createdAt: "2026-07-28",
  },
  {
    id: "2",
    title: "NestJS",
    content: "Need to understand Controllers and Services.",
    createdAt: "2026-07-27",
  },
];

export async function getNotesApi(): Promise<Note[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...fakeNotes]);
    }, 500);
  });
}

export async function createNoteApi(newNote: CreateNoteInput): Promise<Note> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const createdNote = {
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString(), // Standard API format
        ...newNote,
      };
      fakeNotes.push(createdNote);
      resolve(createdNote);
    }, 1000);
  });
}

export async function deleteNoteApi(id: string): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 5% chance to simulate a random network error so you can see the rollback work!
      if (Math.random() < 0.5) {
        return reject(
          new Error("Server crashed! Could not delete note. Please try again."),
        );
      }
      fakeNotes = fakeNotes.filter((note) => note.id !== id);
      resolve(id);
    }, 1000); // 1 second delay to see the instant UI change
  });
}
