import { CreateFolderInput, Folder, FolderNotes } from "../types";

const API_URL = "http://localhost:3001";

export async function getFoldersApi(): Promise<Folder[]> {
  const response = await fetch(`${API_URL}/folders`);
  if (!response.ok) {
    throw new Error("Failed to fetch folders from the API.");
  }
  return response.json();
}

export async function getFoldersNoteApi(
  folderId: string,
): Promise<FolderNotes[]> {
  const response = await fetch(`${API_URL}/folders/${folderId}/notes`);
  if (!response.ok) {
    throw new Error("Failed to fetch notes from the API.");
  }
  return response.json();
}

export async function createFolderApi(
  newFolderName: CreateFolderInput,
): Promise<CreateFolderInput> {
  const response = await fetch(`${API_URL}/folders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: newFolderName.name }),
  });
  if (!response.ok) {
    throw new Error("Failed to create folder.");
  }
  return response.json();
}
