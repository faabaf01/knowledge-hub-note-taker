import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNoteApi } from "../api/notes";
import { CreateNoteInput, Note } from "../types";

export function useCreateNote() {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: createNoteApi,

      // onSuccess: async () => {
      //   queryClient.invalidateQueries({ queryKey: ["notes"] });
      // },

      // Step 1: Triggered the exact millisecond the user clicks "Save Note"
      onMutate: async (newNoteVariables: CreateNoteInput) => {
        // Cancel any outgoing refethches so they don't overwrite our optimistic addition
        await queryClient.cancelQueries({ queryKey: ["notes"] });

        // Snapshot the current state of the notes list cache
        const previousNotes = queryClient.getQueryData<Note[]>(["notes"]);

        // Generate a temporary mock note structure to show on the screen instantly
        const optimisticNote: Note = {
          id: `temp-${Date.now()}`, // Temporary id to satisfy React loop keys
          title: newNoteVariables.title,
          content: newNoteVariables.content,
          createdAt: `${Date.now()}`,
        };

        // Optimistically insert the mock note into the top of the cache list
        queryClient.setQueryData<Note[]>(["notes"], (oldNotes) => {
          return oldNotes ? [optimisticNote, ...oldNotes] : [optimisticNote];
        });

        // Pass the previous list state down to the context object for rollback capability
        return { previousNotes };
      },

      // //Refresh the active notes list automatically upon success
      // onSuccess: (data: Note) => {
      //     console.log("Note created successfully: ", data)
      //     // exact query key used to fetch your notes list
      //     queryClient.invalidateQueries({ queryKey: ["notes"]})
      // },

      // Step 2: Roll back the UI cache if the fake API throws an unexpected error
      onError: (err, newNoteVariables, context) => {
        if (context?.previousNotes) {
          queryClient.setQueryData(["notes"], context.previousNotes);
          alert(`Failed to save note. UI rolled back! Details: ${err.message}`);
        }
      },

      // Step 3: Always synchronize cache with actual database state on final resolution
      onSettled: async () => {
        await queryClient.invalidateQueries({ queryKey: ["notes"] });
      },
    });
}