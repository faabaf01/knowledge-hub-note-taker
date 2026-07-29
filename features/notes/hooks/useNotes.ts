import { useQuery } from "@tanstack/react-query";
import { getNotesApi } from "../api/notes";

export function useNotes() {
    return useQuery({
      queryKey: ["notes"],
      queryFn: getNotesApi,
    });
}