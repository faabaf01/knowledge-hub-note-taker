import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createFolderApi } from "../api/folders"
import {CreateFolderInput, Folder} from "../types";

export function useCreateFolder() {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: createFolderApi,
        onMutate: async (newFolderVariables: CreateFolderInput) => {
            // Cancel any outgoing refetches so they don't overwrite our optimistic addition
            await queryClient.cancelQueries({ queryKey: ["folders"] });
        // Snapshot the current state of the folders list cache
        const previousFolders = queryClient.getQueryData<Folder[]>(["folders"]);

        const optimisticFolder: Folder = {
            id: `temp-${Date.now()}`, // Temporary id to satisfy React loop keys
            name: newFolderVariables.name,
            createdAt: `${Date.now()}`,
            updatedAt: `${Date.now()}`,
        };

        // Optimistically insert the mock folder into the top of the cache list
        queryClient.setQueryData<Folder[]>(["folders"], (oldFolders) => {
            return oldFolders ? [optimisticFolder, ...oldFolders] : [optimisticFolder];
        });

        // Pass the previous list state down to the context object for rollback capability
        return { previousFolders};
        },

        // Roll back the UI cache if the fake API throws an unexpected error
        onError: (err, newFolderVariables, context) => {
            if (context?.previousFolders) {
                queryClient.setQueryData(["folders"], context.previousFolders);
                alert(`Failed to save folder. UI rolled back! Details: ${err.message}`);
            }},

        // Always synchronize cache with actual database state on final resolution
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ["folders"] });
        }

    }
)
}
