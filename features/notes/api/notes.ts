import { Note } from "../types";

const fakeNotes: Note[] = [
    {
        id: "1", 
        title: "React Query", 
        content: "Learning React Query today.", 
        createdAt: "2026-07-28"
    }, 
    {
        id: "2", 
        title: "NestJS", 
        content: "Need to understand Controllers and Services.", 
        createdAt: "2026-07-27"
    }, 
];
export async function getNotes(): Promise<Note[]> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return fakeNotes;
}