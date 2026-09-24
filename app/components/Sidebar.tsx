import React, { useState } from "react";
import { useFolders } from "@/features/notes/hooks/useFolders";
import { BeatLoader } from "react-spinners";

interface SidebarProps {
  sidebarIsOpen: boolean;
  isDark: boolean;
  onClose: () => void;
  selectedFolderId: string | null;
  onSelectFolder: (folderId: string | null) => void;
  onCreateFolder: (name: string) => void;
}

const Sidebar = ({
  sidebarIsOpen,
  onClose,
  selectedFolderId,
  onSelectFolder,
  onCreateFolder,
  isDark,
}: SidebarProps) => {
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const { data: folders, isLoading: isFoldersLoading, error } = useFolders();

  const asideClasses = isDark
    ? "fixed left-0 top-0 z-40 h-screen w-70 shrink-0 transform border-r border-white/10 bg-slate-950 p-4 transition-transform duration-200 ease-in-out"
    : "fixed left-0 top-0 z-40 h-screen w-70 shrink-0 transform border-r border-slate-200 bg-white p-4 transition-transform duration-200 ease-in-out";
  const titleClasses = isDark ? "text-gray-200" : "text-gray-800";
    const buttonClasses = `rounded-full px-4 py-2 text-sm text-white font-semibold cursor-pointer transition ${
      isDark
        ? "bg-cyan-500/70 hover:bg-cyan-500/80 text-white"
        : "bg-cyan-500 hover:bg-cyan-600 text-white"
    }`;
  const folderItemClasses = isDark
    ? "text-gray-300 hover:bg-gray-600 cursor-pointer"
    : "text-gray-700 hover:bg-cyan-200 cursor-pointer";

  const folderActiveClasses = isDark
    ? "bg-white/40 font-bold text-white"
    : "bg-cyan-100 font-bold text-gray-900";

  const emptyTextClasses = isDark ? "text-gray-400" : "text-gray-500";

  const handleCreateFolder = () => {
    if (newFolderName.trim() === "") return;
    //trigger mutate via parent component to create folder
    onCreateFolder(newFolderName.trim());
    console.log("Creating folder:", newFolderName);
    setNewFolderName(""); // Clear the local input field immediately
    setIsCreatingFolder(false);
  };

  const handleCancelCreateFolder = () => {
    setIsCreatingFolder(false);
    setNewFolderName(""); // Clear the input field when canceling
  };

  return (
    <>
      {sidebarIsOpen && (
        <div className="fixed inset-0 z-30 bg-black/40" onClick={onClose} />
      )}

      <aside
        className={`${asideClasses} ${
          sidebarIsOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col justify-between">
          <div className="mb-4 flex items-center justify-between">
            <h3
              className={`text-medium font-semibold uppercase tracking-wide text-gray-400`}
            >
              Folders
            </h3>
            <button
              className={`${buttonClasses} ${error ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={error ? true : false}
              onClick={() => setIsCreatingFolder(true)}
            >
              Add Folder
            </button>
          </div>
          {isCreatingFolder && (
            <div className="mb-4 flex items-center gap-2">
              <input
                type="text"
                placeholder="Folder name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className="w-full rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleCreateFolder}
                  className="flex-1 rounded bg-cyan-500 px-2 py-1 text-xs font-medium text-white transition hover:bg-cyan-600 cursor-pointer"
                >
                  Add
                </button>
                <button
                  className="flex-1 rounded bg-gray-200 px-2 py-1 text-xs font-medium text-gray-700 transition hover:bg-gray-300 dark:bg-white/15 dark:text-gray-300 dark:hover:bg-white/20 cursor-pointer"
                  onClick={handleCancelCreateFolder}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          <ul className="space-y-2">
            {isFoldersLoading ? (
              <BeatLoader size={15} color="#165f78" />
            ) : folders && folders.length > 0 ? (
              <>
                <li
                  onClick={() => onSelectFolder(null)}
                  className={`${folderItemClasses} ${
                    selectedFolderId === null ? folderActiveClasses : ""
                  }`}
                >
                  All Notes
                </li>

                {folders?.map((folder) => (
                  <li
                    key={folder.id}
                    onClick={() => onSelectFolder(folder.id)}
                    className={`${folderItemClasses} ${
                      selectedFolderId === folder.id ? folderActiveClasses : ""
                    }`}
                  >
                    {folder.name}
                  </li>
                ))}
              </>
            ) : (
              <li className={emptyTextClasses}>No folders available</li>
            )}
          </ul>
        </div>
      </aside>
    </>
  );
};
export default Sidebar;
