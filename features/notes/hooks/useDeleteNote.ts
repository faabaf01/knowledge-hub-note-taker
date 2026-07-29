import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNoteApi } from "../api/notes";
import { Note } from "../types";

export function useDeleteNote() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteNoteApi,
        
        // Step 1: Triggered the exact millisecond the user clicks "Delete"
        onMutate: async (noteId:string) => {
            // Cancel any outgoing refeches so they don't overwrite our optimistic update [1]
            await queryClient.cancelQueries({ queryKey: ["notes"]})

            // Snapshot the previous notes array value before we alter it [1]
            const previousNotes = queryClient.getQueryData<Note[]>(['notes'])

            // Optimistically update the cache instantly by removing the note
            queryClient.setQueryData<Note[]>(['notes'], (oldNotes) => {
                return oldNotes ? oldNotes.filter((note) => note.id !== noteId) : []
            })

            // Return a context object containing our snapshot data
            return { previousNotes }
        },
        // //Refresh the active notes list automatically upon success
        // onSuccess: (data: Note) => {
        //     console.log("Note created successfully: ", data)
        //     // exact query key used to fetch your notes list
        //     queryClient.invalidateQueries({ queryKey: ["notes"]})
        // },

        // Step 2: If the fake API throws an error, roll back our UI
        onError: (err, noteId, context) => {
            if (context?.previousNotes) {
                // Restore the cache to the snapshot state, putting the note back on screen!
                queryClient.setQueryData(['notes'], context.previousNotes)
                alert(`Rollback triggered: ${err.message}`)
            }
        },

        // Step 3: Always refetch after success or error to stay perfectly
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['notes']})
        }
    })
}