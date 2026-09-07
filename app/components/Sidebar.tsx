import React from 'react'
import { useFolders } from "@/features/notes/hooks/useFolders";
import { MoonLoader } from "react-spinners";

interface SidebarProps {
  isOpen: boolean;
  isDark: boolean;
  onClose: () => void;
  selectedFolderId: string | null;
  onSelectFolder: (folderId: string) => void;
}

const Sidebar = ({
  isOpen,
  onClose,
  selectedFolderId,
  onSelectFolder,
  isDark,
}: SidebarProps) => {
  const { data: folders, isLoading: isFoldersLoading } = useFolders();
  const asideClasses = isDark
    ? "fixed left-0 top-0 z-40 h-screen w-64 shrink-0 transform border-r border-white/10 bg-slate-950 p-4 transition-transform duration-200 ease-in-out"
    : "fixed left-0 top-0 z-40 h-screen w-64 shrink-0 transform border-r border-slate-200 bg-white p-4 transition-transform duration-200 ease-in-out";
  const titleClasses = isDark ? "text-gray-200" : "text-gray-800";

  const folderItemClasses = isDark
    ? "text-gray-300 hover:bg-gray-600 cursor-pointer"
    : "text-gray-700 hover:bg-cyan-200 cursor-pointer";

  const folderActiveClasses = isDark
    ? "bg-white/40 font-bold text-white"
    : "bg-cyan-100 font-bold text-gray-900";

  const emptyTextClasses = isDark ? "text-gray-400" : "text-gray-500";

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black/40" onClick={onClose} />
      )}

      <aside
        className={`${asideClasses} ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col justify-start h-full">
          <h3 className={`pb-4 text-lg font-semibold ${titleClasses}`}>
            All Folder
          </h3>
          <ul className="space-y-2">
            {isFoldersLoading ? (
              <MoonLoader size={30} color="#36d7b7" />
            ) : folders && folders.length > 0 ? (
              folders?.map((folder) => (
                <li
                  key={folder.id}
                  onClick={() => onSelectFolder(folder.id)}
                  className={`${folderItemClasses} ${
                    selectedFolderId === folder.id ? folderActiveClasses : ""
                  }`}
                >
                  {folder.name}
                </li>
              ))
            ) : (
              <li className={emptyTextClasses}>No folders available</li>
            )}
          </ul>
        </div>
      </aside>
    </>
  );
};
export default Sidebar