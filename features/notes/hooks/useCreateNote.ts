import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNoteApi } from "../api/notes";
import { Note } from "../types";

export function useCreateNote() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createNoteApi,
        
        //Refresh the active notes list automatically upon success
        onSuccess: (data: Note) => {
            console.log("Note created successfully: ", data)
            // exact query key used to fetch your notes list
            queryClient.invalidateQueries({ queryKey: ["notes"]})
        },

        onError: (error) => {
            console.log("Failed to create note: ", error)
        }
    })
}