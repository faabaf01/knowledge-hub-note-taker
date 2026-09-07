import { CreateNoteInput, Note } from "../types";

const API_URL = "http://localhost:3001";

export async function getNotesApi(): Promise<Note[]> {
  const response = await fetch(`${API_URL}/notes`);
  if (!response.ok) {
    throw new Error("Failed to fetch notes from the API.");
  }
  return response.json();
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
}


export async function deleteNoteApi(id: string): Promise<Note> {
  const response = await fetch(`${API_URL}/notes/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete note in the API.");
  }
  return response.json();
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
}