import { useQuery } from "@tanstack/react-query";
import { getFoldersApi } from "../api/folders";

export function useFolders() {
    return useQuery({
      queryKey: ["folders"],
      queryFn: getFoldersApi,
    });
}