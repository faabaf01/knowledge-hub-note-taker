import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNoteApi } from "../api/notes";
import { Note } from "../types";

export function useUpdateNote() {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: updateNoteApi,

      // Step 1: Triggered instantly on forn submit
      onMutate: async (updatedNote: Note) => {
        await queryClient.cancelQueries({ queryKey: ["notes"] });

        // Snapshot previous cache state
        const previousNotes = queryClient.getQueryData<Note[]>(["notes"]);

        // Optimistically modify the specific item inside the array cache copy
        queryClient.setQueryData<Note[]>(["notes"], (oldNotes) => {
          return oldNotes ? oldNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note)) : []
        });

        return { previousNotes };
      },

      // Step 2: Revert to snapshot on network failure
      onError: (err, updatedNote, context) => {
        if (context?.previousNotes) {
          queryClient.setQueryData(["notes"], context.previousNotes);
          alert(`Failed to save changes. UI rolled back: ${err.message}`);
        }
      },

      // Step 3: Resync with server truth
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["notes"] });
      },
    });
}