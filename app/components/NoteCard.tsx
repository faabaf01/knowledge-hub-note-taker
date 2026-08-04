"use client"
import React, { useState } from 'react'
import { Note } from '@/features/notes/types'
import { useDeleteNote } from '@/features/notes/hooks/useDeleteNote';
import { useUpdateNote } from '@/features/notes/hooks/useUpdateNote';

interface NoteCardProps {
    note: Note;
}

const NoteCard = ({ note }: NoteCardProps) => {
    const { mutate: deleteNote } = useDeleteNote();
    const { mutate: updateNote } = useUpdateNote()

    const [isEditing, setIsEditing] = useState(false)
    const [editForm, setEditForm] = useState({ title: note.title, content: note.content})

    const isOptimistic = note.id.startsWith("temp-");

    const handleSave = () => {
        if (!editForm.title.trim() || !editForm.content.trim()) return;
        
        // Save modifcations to cache and API
        updateNote( { id: note.id, createdAt: note.createdAt, ...editForm })
        setIsEditing(false)
    }

    if (isEditing) {
      return (
        <div className='p-4 border rounded shadow-sm bg-blue-50/50 space-y-3'>
          <input value={editForm.title}
            onChange={(e) => setEditForm((prev) => ({ ...prev, title: e. target.value }))}
            className='w-full p-1 text-sm border rounded'
          />
          <textarea value={editForm.content}
            onChange={(e) => setEditForm((prev) => ({ ...prev, content: e.target.value }))}
            rows={3}
            className='w-full p-1 text-sm border rounded'
          />
          <div className='flex gap-2 justify-end'>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      )
    }

  return (
    <div
        className={`border rounded-lg p-4 mb-4 ${
        isOptimistic ? "opacity-50 border-dashed border-blue-400"
            : "opacity-100"}`}
              >
                <div className="flex flex-row justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      {isOptimistic && (
                        <p className="text-md text-blue-400 font-medium">
                          Saving...
                        </p>
                      )}
                    </div>
                    <h2 className="font-semibold">{note.title}</h2>
                    <p>{note.content}</p>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => setIsEditing(true)}
                      disabled={isOptimistic} // prevent deleting an item that hasn't saved yet
                      className="text-xs font-medium text-blue-600 hover:text-blue-800 disbled:text-gray-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteNote(note.id)}
                      disabled={isOptimistic} // prevent deleting an item that hasn't saved yet
                    //   className={deleteButtonClasses}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
  )
}

export default NoteCard