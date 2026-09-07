import { useQuery } from "@tanstack/react-query";
import { getFoldersNoteApi } from "../api/folders";

export function useFolderNote(folderId: string) {
    return useQuery({
      queryKey: ["folder-notes", folderId],
      queryFn: () => getFoldersNoteApi(folderId),
    });
}