import React from 'react'

interface NewNoteFormProps {
    folderId: string;
    onCancel?: () => void;
    onSuccess?: () => void;
}

const NewNoteForm = ({folderId, onCancel, onSuccess}: NewNoteFormProps) => {
  return (
    <div>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">Create New Note</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="noteTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                        <input type="text" id="noteTitle" name="noteTitle" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="noteContent" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
                        <textarea id="noteContent" name="noteContent" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring focus:ring-cyan-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white"></textarea>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onCancel} className="rounded bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500">Cancel</button>
                        <button type="submit" className="rounded bg-cyan-500 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-600">Create</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default NewNoteForm