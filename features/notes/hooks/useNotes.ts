import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../api/notes";

export function useNotes() {
    return useQuery({
        queryKey: ["notes"],
        queryFn: getNotes
    })
}