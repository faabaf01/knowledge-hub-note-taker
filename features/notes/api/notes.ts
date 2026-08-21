import { CreateNoteInput, Note } from "../types";

// let fakeNotes: Note[] = [
//   {
//     id: "1",
//     title: "React Query",
//     content: "Learning React Query today.",
//     createdAt: "2026-07-28",
//   },
//   {
//     id: "2",
//     title: "NestJS",
//     content: "Need to understand Controllers and Services.",
//     createdAt: "2026-07-27",
//   },
// ];

const API_URL = "http://localhost:3001";

export async function getNotesApi(): Promise<Note[]> {
  const response = await fetch(`${API_URL}/notes`);
  if (!response.ok) {
    throw new Error("Failed to fetch notes from the API.");
  }
  return response.json();
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve([...fakeNotes]);
  //   }, 500);
  // });
}

export async function createNoteApi(newNote: CreateNoteInput): Promise<Note> {
  const response = await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newNote),
  });

  if (!response.ok) {
    throw new Error("Failed to create note in the API.");
  }

  return response.json();
  // setTimeout(() => {
  //   const createdNote = {
  //     id: Math.random().toString(36).substring(2, 9),
  //     createdAt: new Date().toISOString(), // Standard API format
  //     ...newNote,
  //   };
  //   fakeNotes.push(createdNote);
  //   resolve(createdNote);
  // }, 1000);
}


export async function deleteNoteApi(id: string): Promise<Note> {
  const response = await fetch(`${API_URL}/notes/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete note in the API.");
  }
  return response.json();
  // setTimeout(() => {
  //   // 5% chance to simulate a random network error so you can see the rollback work!
  //   if (Math.random() < 0.5) {
  //     return reject(
  //       new Error("Server crashed! Could not delete note. Please try again."),
  //     );
  //   }
  //   fakeNotes = fakeNotes.filter((note) => note.id !== id);
  //   resolve(id);
  // }, 1000); // 1 second delay to see the instant UI change
}

export async function updateNoteApi(updatedNote: Note): Promise<Note> {
  const response = await fetch(`${API_URL}/notes/${updatedNote.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedNote),
  });

  if (!response.ok) {
    throw new Error("Failed to update note in the API.");
  }

  return response.json();
  // setTimeout(() => {
  //   const index = fakeNotes.findIndex((note) => note.id === updatedNote.id);
  //   if (index === -1) {
  //     return reject(new Error("Note not found in database."));
  //   }
  //   fakeNotes[index] = updatedNote;
  //   resolve(updatedNote);
  // }, 800);
}